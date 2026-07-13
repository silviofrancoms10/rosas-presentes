import { extname } from 'path'
import { useBucket } from '~/server/utils/cloudflare'

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

  // Define a pasta do storage (produtos por padrão, ou categorias)
  const query = getQuery(event)
  const folder = (query.folder as string) || 'produtos'

  if (folder !== 'produtos' && folder !== 'categorias') {
    throw createError({ statusCode: 400, statusMessage: 'Pasta inválida. Use "produtos" ou "categorias"' })
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

  // Sanitiza o nome do arquivo
  const ext = extname(filePart.filename).toLowerCase()
  const safeName = filePart.filename
    .replace(ext, '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)

  const finalName = `${safeName}-${Date.now()}${ext}` // Adiciona timestamp para evitar conflitos de nomes iguais
  const storagePath = `${folder}/${finalName}`

  const bucket = useBucket(event)

  try {
    // Faz upload do buffer para o bucket do Cloudflare R2
    await bucket.put(storagePath, filePart.data, {
      httpMetadata: { contentType: mimeType }
    })

    // Retorna a URL pública gerada usando a base configurada nas variáveis de ambiente
    const r2PublicUrl = process.env.R2_PUBLIC_URL || 'https://sua-url-r2-publica.dev'
    const publicUrl = `${r2PublicUrl}/${storagePath}`

    return {
      ok: true,
      url: publicUrl,
      filename: finalName
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao fazer upload no Cloudflare R2: ${e.message}`
    })
  }
})

