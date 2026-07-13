import { d as defineEventHandler, c as createError, b as getQuery, a as readMultipartFormData, g as getHeader } from '../../../nitro/nitro.mjs';
import { extname } from 'path';
import { a as useBucket } from '../../../_/cloudflare.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
function checkAuth(event) {
  var _a;
  const secret = process.env.ADMIN_SECRET;
  const auth = (_a = getHeader(event, "authorization")) != null ? _a : "";
  const token = auth.replace("Bearer ", "").trim();
  if (!secret || token !== secret) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
}
const upload = defineEventHandler(async (event) => {
  var _a;
  checkAuth(event);
  if (event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }
  const query = getQuery(event);
  const folder = query.folder || "produtos";
  if (folder !== "produtos" && folder !== "categorias") {
    throw createError({ statusCode: 400, statusMessage: 'Pasta inv\xE1lida. Use "produtos" ou "categorias"' });
  }
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Nenhum arquivo enviado" });
  }
  const filePart = parts.find((p) => p.name === "file");
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Campo "file" ausente' });
  }
  const mimeType = (_a = filePart.type) != null ? _a : "";
  if (!ALLOWED_TYPES.includes(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: "Apenas PNG, JPG e JPEG s\xE3o permitidos" });
  }
  if (filePart.data.byteLength > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: "Arquivo muito grande (m\xE1x. 5MB)" });
  }
  const ext = extname(filePart.filename).toLowerCase();
  const safeName = filePart.filename.replace(ext, "").toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").substring(0, 60);
  const finalName = `${safeName}-${Date.now()}${ext}`;
  const storagePath = `${folder}/${finalName}`;
  const bucket = useBucket(event);
  try {
    await bucket.put(storagePath, filePart.data, {
      httpMetadata: { contentType: mimeType }
    });
    const r2PublicUrl = process.env.R2_PUBLIC_URL || "https://sua-url-r2-publica.dev";
    const publicUrl = `${r2PublicUrl}/${storagePath}`;
    return {
      ok: true,
      url: publicUrl,
      filename: finalName
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao fazer upload no Cloudflare R2: ${e.message}`
    });
  }
});

export { upload as default };
