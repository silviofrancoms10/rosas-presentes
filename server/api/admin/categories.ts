import { useDB } from '~/server/utils/cloudflare'

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

  if (event.method !== 'PUT') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  if (!body.id || !body.name || !body.image) {
    throw createError({ statusCode: 400, statusMessage: 'id, name e image são obrigatórios' })
  }

  const db = useDB(event)
  try {
    await db
      .prepare('UPDATE categories SET name = ?, image = ? WHERE id = ?')
      .bind(body.name, body.image, body.id)
      .run()

    return { ok: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao atualizar categoria no Cloudflare D1: ${e.message}`
    })
  }
})

