import { useSupabase } from '~/server/utils/supabase'

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
  const client = useSupabase()

  // GET - listar todos os produtos
  if (method === 'GET') {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao buscar produtos: ${error.message}` })
    }
    return data
  }

  // POST - criar novo produto
  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.id || !body.name || !body.price) {
      throw createError({ statusCode: 400, statusMessage: 'id, name e price são obrigatórios' })
    }

    // Verifica ID duplicado
    const { data: existing, error: checkError } = await client
      .from('products')
      .select('id')
      .eq('id', body.id)
      .maybeSingle()

    if (checkError) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao validar ID: ${checkError.message}` })
    }
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'ID já existe' })
    }

    const { error: insertError } = await client
      .from('products')
      .insert([body])

    if (insertError) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao criar produto: ${insertError.message}` })
    }

    return { ok: true, product: body }
  }

  // PUT - atualizar produto existente
  if (method === 'PUT') {
    const body = await readBody(event)
    if (!body.id) {
      throw createError({ statusCode: 400, statusMessage: 'id é obrigatório' })
    }

    const { error: updateError } = await client
      .from('products')
      .update(body)
      .eq('id', body.id)

    if (updateError) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar produto: ${updateError.message}` })
    }

    return { ok: true, product: body }
  }

  // DELETE - remover produto por id (query param)
  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id as string
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'query param id é obrigatório' })
    }

    const { error: deleteError } = await client
      .from('products')
      .delete()
      .eq('id', id)

    if (deleteError) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao remover produto: ${deleteError.message}` })
    }

    return { ok: true, removed: id }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
