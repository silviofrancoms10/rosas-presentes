import { writeFile, mkdir } from 'fs/promises'
import { resolve, extname } from 'path'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

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

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Nenhum arquivo enviado' })
  }

  const filePart = parts.find(p => p.name === 'file')
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Campo "file" ausente' })
  }

  const mimeType = filePart.type ?? ''
  if (!ALLOWED_TYPES.includes(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: 'Apenas PNG, JPG e JPEG são permitidos' })
  }

  if (filePart.data.byteLength > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: 'Arquivo muito grande (máx. 5MB)' })
  }

  // Sanitiza o nome do arquivo: remove espaços e caracteres especiais
  const ext = extname(filePart.filename).toLowerCase()
  const safeName = filePart.filename
    .replace(ext, '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)

  const finalName = `${safeName}${ext}`
  const uploadDir = resolve('./public/images/produtos')

  // Garante que a pasta existe
  await mkdir(uploadDir, { recursive: true })

  const filePath = resolve(uploadDir, finalName)
  await writeFile(filePath, filePart.data)

  return {
    ok: true,
    url: `/images/produtos/${finalName}`,
    filename: finalName,
  }
})
