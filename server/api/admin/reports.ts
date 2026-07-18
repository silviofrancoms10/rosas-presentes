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
  const db = useDB(event)

  try {
    // 1. Contagem de pedidos por status e faturamento correspondente
    const { results: statusStats } = await db.prepare(`
      SELECT 
        status, 
        COUNT(*) as count, 
        SUM(total_price) as total_amount 
      FROM orders 
      GROUP BY status
    `).all()

    // 2. Produtos mais pedidos (Top 10 - excluindo cancelados e pendentes)
    const { results: topProducts } = await db.prepare(`
      SELECT 
        oi.product_id, 
        oi.product_name, 
        SUM(oi.quantity) as total_qty, 
        SUM(oi.quantity * oi.price) as revenue 
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status NOT IN ('cancelado', 'pendente')
      GROUP BY oi.product_id, oi.product_name 
      ORDER BY total_qty DESC 
      LIMIT 10
    `).all()

    // 3. Faturamento por Dia (excluindo cancelados e pendentes)
    const { results: billingDaily } = await db.prepare(`
      SELECT 
        date(created_at) as period, 
        SUM(total_price) as revenue, 
        COUNT(*) as count 
      FROM orders 
      WHERE status NOT IN ('cancelado', 'pendente') 
      GROUP BY period 
      ORDER BY period DESC
    `).all()

    // 4. Faturamento por Semana (excluindo cancelados e pendentes)
    const { results: billingWeekly } = await db.prepare(`
      SELECT 
        strftime('%Y-W%W', created_at) as period, 
        SUM(total_price) as revenue, 
        COUNT(*) as count 
      FROM orders 
      WHERE status NOT IN ('cancelado', 'pendente') 
      GROUP BY period 
      ORDER BY period DESC
    `).all()

    // 5. Faturamento por Mês (excluindo cancelados e pendentes)
    const { results: billingMonthly } = await db.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as period, 
        SUM(total_price) as revenue, 
        COUNT(*) as count 
      FROM orders 
      WHERE status NOT IN ('cancelado', 'pendente') 
      GROUP BY period 
      ORDER BY period DESC
    `).all()

    // 6. Faturamento por Ano (excluindo cancelados e pendentes)
    const { results: billingYearly } = await db.prepare(`
      SELECT 
        strftime('%Y', created_at) as period, 
        SUM(total_price) as revenue, 
        COUNT(*) as count 
      FROM orders 
      WHERE status NOT IN ('cancelado', 'pendente') 
      GROUP BY period 
      ORDER BY period DESC
    `).all()

    return {
      statusStats: statusStats || [],
      topProducts: topProducts || [],
      billingDaily: billingDaily || [],
      billingWeekly: billingWeekly || [],
      billingMonthly: billingMonthly || [],
      billingYearly: billingYearly || [],
    }
  } catch (e: any) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Erro ao gerar relatório do D1: ${e.message}` 
    })
  }
})
