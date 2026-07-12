import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

const PRODUCTS_PATH = resolve('./data/products.json')

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

  // GET - listar todos os produtos
  if (method === 'GET') {
    const raw = await readFile(PRODUCTS_PATH, 'utf-8')
    return JSON.parse(raw)
  }

  // POST - criar novo produto
  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.id || !body.name || !body.price) {
      throw createError({ statusCode: 400, statusMessage: 'id, name e price são obrigatórios' })
    }
    const raw = await readFile(PRODUCTS_PATH, 'utf-8')
    const products = JSON.parse(raw)
    // Verifica ID duplicado
    if (products.find((p: any) => p.id === body.id)) {
      throw createError({ statusCode: 409, statusMessage: 'ID já existe' })
    }
    products.push(body)
    await writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2), 'utf-8')
    return { ok: true, product: body }
  }

  // PUT - atualizar produto existente
  if (method === 'PUT') {
    const body = await readBody(event)
    if (!body.id) {
      throw createError({ statusCode: 400, statusMessage: 'id é obrigatório' })
    }
    const raw = await readFile(PRODUCTS_PATH, 'utf-8')
    const products = JSON.parse(raw)
    const idx = products.findIndex((p: any) => p.id === body.id)
    if (idx === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }
    products[idx] = { ...products[idx], ...body }
    await writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2), 'utf-8')
    return { ok: true, product: products[idx] }
  }

  // DELETE - remover produto por id (query param)
  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'query param id é obrigatório' })
    }
    const raw = await readFile(PRODUCTS_PATH, 'utf-8')
    const products = JSON.parse(raw)
    const filtered = products.filter((p: any) => p.id !== id)
    if (filtered.length === products.length) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }
    await writeFile(PRODUCTS_PATH, JSON.stringify(filtered, null, 2), 'utf-8')
    return { ok: true, removed: id }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
