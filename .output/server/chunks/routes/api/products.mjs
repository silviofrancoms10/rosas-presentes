import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { u as useSupabase } from '../../_/supabase.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/supabase-js';

const products = defineEventHandler(async () => {
  const client = useSupabase();
  const { data, error } = await client.from("products").select("*").order("created_at", { ascending: false });
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao buscar produtos no Supabase: ${error.message}`
    });
  }
  return data;
});

export { products as default };
//# sourceMappingURL=products.mjs.map
