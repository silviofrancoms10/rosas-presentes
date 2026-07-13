export const useDB = (event: any) => {
  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare D1 Database binding "DB" não encontrada. Verifique se a variável/binding está ativa no painel da Cloudflare ou executando via Wrangler.'
    })
  }
  return db
}

export const useBucket = (event: any) => {
  const bucket = event.context.cloudflare?.env?.BUCKET
  if (!bucket) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare R2 Bucket binding "BUCKET" não encontrada. Verifique se o bucket está configurado no wrangler.toml.'
    })
  }
  return bucket
}
