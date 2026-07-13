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

  // GET - listar todos os produtos
  if (method === 'GET') {
    try {
      const { results } = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all()
      return (results || []).map((row: any) => ({
        ...row,
        featured: row.featured === 1,
        categories: JSON.parse(row.categories || '[]'),
        images: JSON.parse(row.images || '[]')
      }))
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao buscar produtos: ${e.message}` })
    }
  }

  // POST - criar novo produto
  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.id || !body.name || !body.price) {
      throw createError({ statusCode: 400, statusMessage: 'id, name e price são obrigatórios' })
    }

    try {
      // Verifica ID duplicado
      const existing = await db
        .prepare('SELECT id FROM products WHERE id = ?')
        .bind(body.id)
        .first()

      if (existing) {
        throw createError({ statusCode: 409, statusMessage: 'ID já existe' })
      }

      const categoriesStr = JSON.stringify(body.categories || [])
      const imagesStr = JSON.stringify(body.images || [])
      const featuredVal = body.featured ? 1 : 0

      await db
        .prepare(
          'INSERT INTO products (id, name, description, price, oldPrice, category, categories, image, images, featured, installments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        )
        .bind(
          body.id,
          body.name,
          body.description || null,
          Number(body.price),
          body.oldPrice ? Number(body.oldPrice) : null,
          body.category,
          categoriesStr,
          body.image || null,
          imagesStr,
          featuredVal,
          body.installments || null
        )
        .run()

      return { ok: true, product: body }
    } catch (e: any) {
      throw createError({
        statusCode: e.statusCode || 500,
        statusMessage: e.statusMessage || `Erro ao criar produto no D1: ${e.message}`
      })
    }
  }

  // PUT - atualizar produto existente
  if (method === 'PUT') {
    const body = await readBody(event)
    if (!body.id) {
      throw createError({ statusCode: 400, statusMessage: 'id é obrigatório' })
    }

    try {
      const categoriesStr = JSON.stringify(body.categories || [])
      const imagesStr = JSON.stringify(body.images || [])
      const featuredVal = body.featured ? 1 : 0

      await db
        .prepare(
          'UPDATE products SET name = ?, description = ?, price = ?, oldPrice = ?, category = ?, categories = ?, image = ?, images = ?, featured = ?, installments = ? WHERE id = ?'
        )
        .bind(
          body.name,
          body.description || null,
          Number(body.price),
          body.oldPrice ? Number(body.oldPrice) : null,
          body.category,
          categoriesStr,
          body.image || null,
          imagesStr,
          featuredVal,
          body.installments || null,
          body.id
        )
        .run()

      return { ok: true, product: body }
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar produto no D1: ${e.message}` })
    }
  }

  // DELETE - remover produto por id (query param)
  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'query param id é obrigatório' })
    }

    try {
      await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
      return { ok: true, removed: id }
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao remover produto no D1: ${e.message}` })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})

