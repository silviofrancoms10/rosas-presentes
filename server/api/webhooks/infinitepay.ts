import { useDB } from '~/server/utils/cloudflare'

export default defineEventHandler(async (event) => {
  // O webhook da InfinitePay envia requisições POST
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const db = useDB(event)
  let body: any
  try {
    body = await readBody(event)
  } catch (err: any) {
    console.error('[Webhook InfinitePay] Erro ao decodificar body JSON:', err.message)
    throw createError({ statusCode: 400, statusMessage: 'JSON inválido' })
  }

  console.log('Webhook InfinitePay recebido:', JSON.stringify(body))

  // Extrai order_nsu e status
  // O order_nsu é o id do nosso pedido (ex: RP-123456)
  const orderId = body.order_nsu
  const ipStatus = body.status

  if (!orderId) {
    console.warn('[Webhook InfinitePay] Recebido webhook sem order_nsu:', JSON.stringify(body))
    return { success: false, message: 'order_nsu é obrigatório' }
  }

  try {
    // Busca o pedido no banco
    const order = await db.prepare('SELECT id, status, customer_name FROM orders WHERE id = ?').bind(orderId).first()
    if (!order) {
      console.warn(`[Webhook InfinitePay] Pedido ${orderId} não encontrado no banco de dados.`)
      return { success: false, message: 'Pedido não encontrado' }
    }

    // Normaliza o status recebido
    const normalizedStatus = String(ipStatus || '').toLowerCase()
    
    // Se o status da InfinitePay for aprovado ou pago
    const isPaid = ['approved', 'paid', 'confirmed', 'pago', 'success'].includes(normalizedStatus)
    const isFailed = ['denied', 'failed', 'canceled', 'cancelled', 'rejeitado', 'negado', 'expired', 'expirado'].includes(normalizedStatus)

    if (isPaid) {
      // Se o pedido estiver pendente, atualiza para novo (pago)
      if (order.status === 'pendente') {
        await db.prepare("UPDATE orders SET status = 'novo' WHERE id = ?").bind(orderId).run()
        console.log(`[Webhook InfinitePay] Pedido ${orderId} (Cliente: ${order.customer_name}) atualizado para status 'novo' (pago).`)
      } else {
        console.log(`[Webhook InfinitePay] Pedido ${orderId} já está com status '${order.status}'. Nenhuma alteração feita.`)
      }
    } else if (isFailed) {
      if (order.status === 'pendente') {
        await db.prepare("UPDATE orders SET status = 'cancelado' WHERE id = ?").bind(orderId).run()
        console.log(`[Webhook InfinitePay] Pedido ${orderId} atualizado para status 'cancelado' (pagamento falhou/cancelado).`)
      }
    }

    return { success: true }
  } catch (err: any) {
    console.error('[Webhook InfinitePay] Erro ao processar:', err)
    throw createError({ statusCode: 500, statusMessage: `Erro interno ao processar webhook: ${err.message}` })
  }
})
