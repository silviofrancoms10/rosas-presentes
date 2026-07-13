import { useDB } from '~/server/utils/cloudflare'

export default defineEventHandler(async (event) => {
  const db = useDB(event)
  try {
    const { results } = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all()

    return (results || []).map((row: any) => ({
      ...row,
      featured: row.featured === 1,
      categories: JSON.parse(row.categories || '[]'),
      images: JSON.parse(row.images || '[]')
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao buscar produtos no Cloudflare D1: ${e.message}`
    })
  }
})

