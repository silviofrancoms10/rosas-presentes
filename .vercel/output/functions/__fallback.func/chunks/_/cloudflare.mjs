import { c as createError } from '../nitro/nitro.mjs';

const useDB = (event) => {
  var _a, _b;
  const db = (_b = (_a = event.context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.DB;
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare D1 Database binding "DB" n\xE3o encontrada. Verifique se a vari\xE1vel/binding est\xE1 ativa no painel da Cloudflare ou executando via Wrangler.'
    });
  }
  return db;
};
const useBucket = (event) => {
  var _a, _b;
  const bucket = (_b = (_a = event.context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.BUCKET;
  if (!bucket) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare R2 Bucket binding "BUCKET" n\xE3o encontrada. Verifique se o bucket est\xE1 configurado no wrangler.toml.'
    });
  }
  return bucket;
};

export { useBucket as a, useDB as u };
