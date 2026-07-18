import { useDB } from '~/server/utils/cloudflare'

// Verifica autenticação via header Authorization: Bearer <secret>
function checkAuth(event: any) {
  const secret = process.env.ADMIN_SECRET
  const auth = getHeader(event, 'authorization') ?? ''
  const token = auth.replace('Bearer ', '').trim()
  if (!secret || token !== secret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

export default defineEventHandler(async (event) => {
  checkAuth(event)

  const method = event.method
  const db = useDB(event)

  // GET - Listar todos os pedidos com seus itens
  if (method === 'GET') {
    try {
      const { results: orders } = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()
      const { results: items } = await db.prepare('SELECT * FROM order_items').all()

      // Agrupa itens por order_id
      const itemsByOrderId: Record<string, any[]> = {}
      for (const item of (items || [])) {
        if (!itemsByOrderId[item.order_id]) {
          itemsByOrderId[item.order_id] = []
        }
        itemsByOrderId[item.order_id].push(item)
      }

      // Acopla itens aos respectivos pedidos
      const fullOrders = (orders || []).map((order: any) => ({
        ...order,
        items: itemsByOrderId[order.id] || []
      }))

      return fullOrders
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao buscar pedidos: ${e.message}` })
    }
  }

  // PUT - Atualizar status de um pedido
  if (method === 'PUT') {
    const body = await readBody(event)
    const { id, status } = body

    if (!id || !status) {
      throw createError({ statusCode: 400, statusMessage: 'id e status são obrigatórios' })
    }

    const allowedStatuses = ['novo', 'enviado', 'cancelado', 'concluido']
    if (!allowedStatuses.includes(status)) {
      throw createError({ statusCode: 400, statusMessage: 'Status inválido' })
    }

    try {
      await db.prepare('UPDATE orders SET status = ? WHERE id = ?').bind(status, id).run()
      return { ok: true }
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar status do pedido: ${e.message}` })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
