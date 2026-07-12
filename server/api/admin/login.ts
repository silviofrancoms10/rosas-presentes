// POST /api/admin/login
// Valida a senha e retorna o token para usar nas demais rotas admin
export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  const secret = process.env.ADMIN_SECRET

  if (!secret || body.password !== secret) {
    throw createError({ statusCode: 401, statusMessage: 'Senha incorreta' })
  }

  return { ok: true, token: secret }
})
