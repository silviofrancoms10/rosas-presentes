import { useSupabase } from '~/server/utils/supabase'

export default defineEventHandler(async () => {
  const client = useSupabase()
  const { data, error } = await client
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao buscar produtos no Supabase: ${error.message}`
    })
  }

  return data
})
