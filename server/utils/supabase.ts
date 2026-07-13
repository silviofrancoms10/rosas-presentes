import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const url = process.env.SUPABASE_URL
  // Utiliza a service role key se disponível para ignorar RLS no backend, senão cai na key pública/anon
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

  if (!url || !key) {
    throw new Error('Supabase URL ou Key está faltando nas variáveis de ambiente (.env)')
  }

  return createClient(url, key)
}
