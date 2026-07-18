import { useDB } from '~/server/utils/cloudflare'

export default defineEventHandler(async (event) => {
  const method = event.method
  const db = useDB(event)

  // GET - buscar dados públicos de um pedido (para a tela de sucesso após o redirect)
  if (method === 'GET') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'id é obrigatório' })
    }

    try {
      const order = await db.prepare('SELECT id, delivery_date, delivery_time FROM orders WHERE id = ?').bind(id).first()
      if (!order) {
        throw createError({ statusCode: 404, statusMessage: 'Pedido não encontrado' })
      }
      return {
        id: order.id,
        deliveryDate: order.delivery_date,
        deliveryTime: order.delivery_time
      }
    } catch (e: any) {
      throw createError({
        statusCode: e.statusCode || 500,
        statusMessage: e.statusMessage || `Erro ao buscar o pedido: ${e.message}`
      })
    }
  }

  // POST - Criar novo pedido e gerar link na InfinitePay
  if (method === 'POST') {
    const body = await readBody(event)

    const {
      customerName,
      customerPhone,
      recipientName,
      deliveryAddress,
      deliveryDate,
      deliveryTime,
      cardMessage,
      paymentMethod,
      totalPrice,
      items
    } = body

    if (!customerName || !customerPhone || !recipientName || !deliveryAddress || !deliveryDate || !paymentMethod || !totalPrice || !items || !items.length) {
      throw createError({ statusCode: 400, statusMessage: 'Campos obrigatórios ausentes' })
    }

    try {
      // 1. Gera um ID de pedido único no formato: RP-XXXXXX
      let orderId = ''
      let exists = true
      while (exists) {
        const randNum = Math.floor(100000 + Math.random() * 900000)
        orderId = `RP-${randNum}`
        const existing = await db.prepare('SELECT id FROM orders WHERE id = ?').bind(orderId).first()
        if (!existing) {
          exists = false
        }
      }

      // 2. Constrói o link de redirecionamento dinamicamente com base nas informações da requisição
      const headers = getRequestHeaders(event)
      const host = headers.host || 'localhost:3000'
      const protocol = headers['x-forwarded-proto'] || 'http'
      const redirectUrl = `${protocol}://${host}/checkout?success=true&order_id=${orderId}`

      // 3. Define multiplicador de desconto (PIX tem 5% de desconto)
      const discountMultiplier = paymentMethod === 'pix' ? 0.95 : 1.0

      // 4. Monta o payload para a API de links da InfinitePay
      const infinitePayPayload = {
        handle: 'silvio-augusto-46j',
        redirect_url: redirectUrl,
        order_nsu: orderId,
        amount: Math.round(Number(totalPrice) * 100), // Preço total em centavos
        items: items.map((item: any) => ({
          title: item.product.name,
          description: item.product.name, // Campo obrigatório
          price: Math.round(Number(item.product.price) * discountMultiplier * 100), // Preço unitário ajustado com desconto em centavos
          quantity: Number(item.quantity)
        }))
      }

      // 5. Efetua a requisição para a InfinitePay
      let paymentUrl = ''
      try {
        const response = await $fetch<{ url: string }>('https://api.checkout.infinitepay.io/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: infinitePayPayload
        })
        if (response && response.url) {
          paymentUrl = response.url
        } else {
          throw new Error('Nenhuma URL de checkout foi retornada pela API da InfinitePay.')
        }
      } catch (apiErr: any) {
        console.error('Erro detalhado ao chamar API da InfinitePay:', apiErr.data || apiErr)
        const errorDetails = apiErr.data ? JSON.stringify(apiErr.data) : (apiErr.message || apiErr)
        throw createError({
          statusCode: 502,
          statusMessage: `Erro ao gerar link de pagamento na InfinitePay: ${errorDetails}`
        })
      }

      // 6. Prepara inserção no Banco de Dados
      const statements = []

      // Insere pedido
      const insertOrderStmt = db.prepare(`
        INSERT INTO orders (
          id, customer_name, customer_phone, recipient_name, delivery_address,
          delivery_date, delivery_time, card_message, payment_method, total_price, status, payment_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'novo', ?)
      `).bind(
        orderId,
        customerName,
        customerPhone,
        recipientName,
        deliveryAddress,
        deliveryDate,
        deliveryTime || null,
        cardMessage || null,
        paymentMethod,
        Number(totalPrice),
        paymentUrl
      )
      statements.push(insertOrderStmt)

      // Insere itens do pedido
      for (const item of items) {
        const insertItemStmt = db.prepare(`
          INSERT INTO order_items (
            order_id, product_id, product_name, price, quantity
          ) VALUES (?, ?, ?, ?, ?)
        `).bind(
          orderId,
          item.product.id,
          item.product.name,
          Number(item.product.price) * discountMultiplier, // Salva o preço efetivo pago no banco
          Number(item.quantity)
        )
        statements.push(insertItemStmt)
      }

      // Executa em uma transação D1
      await db.batch(statements)

      return { ok: true, orderId, paymentUrl }
    } catch (e: any) {
      throw createError({
        statusCode: e.statusCode || 500,
        statusMessage: e.statusMessage || `Erro ao processar o pedido no banco de dados: ${e.message}`
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
