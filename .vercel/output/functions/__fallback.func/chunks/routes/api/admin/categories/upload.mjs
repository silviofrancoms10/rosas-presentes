import { d as defineEventHandler, c as createError, a as readMultipartFormData, g as getHeader } from '../../../../nitro/nitro.mjs';
import { extname } from 'path';
import { a as useBucket } from '../../../../_/cloudflare.mjs';
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
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Nenhum arquivo enviado" });
  }
  const filePart = parts.find((p) => p.name === "file");
  const categoryNamePart = parts.find((p) => p.name === "categoryName");
  const oldImageUrlPart = parts.find((p) => p.name === "oldImageUrl");
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Campo "file" ausente' });
  }
  if (!categoryNamePart || !categoryNamePart.data) {
    throw createError({ statusCode: 400, statusMessage: 'Campo "categoryName" ausente' });
  }
  const categoryName = categoryNamePart.data.toString("utf-8");
  const oldImageUrl = oldImageUrlPart ? oldImageUrlPart.data.toString("utf-8") : "";
  const mimeType = (_a = filePart.type) != null ? _a : "";
  if (!ALLOWED_TYPES.includes(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: "Apenas PNG, JPG e JPEG s\xE3o permitidos" });
  }
  if (filePart.data.byteLength > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: "Arquivo muito grande (m\xE1x. 5MB)" });
  }
  const bucket = useBucket(event);
  const r2PublicUrl = process.env.R2_PUBLIC_URL || "https://sua-url-r2-publica.dev";
  try {
    if (oldImageUrl && oldImageUrl.includes(r2PublicUrl)) {
      const relativePath = oldImageUrl.split(`${r2PublicUrl}/`)[1];
      if (relativePath) {
        await bucket.delete(relativePath);
      }
    }
    const ext = extname(filePart.filename).toLowerCase();
    const sanitizedCategory = categoryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-");
    const finalName = `categoria-${sanitizedCategory}-${Date.now()}${ext}`;
    const storagePath = `categorias/${finalName}`;
    await bucket.put(storagePath, filePart.data, {
      httpMetadata: { contentType: mimeType }
    });
    const publicUrl = `${r2PublicUrl}/${storagePath}`;
    return {
      ok: true,
      url: publicUrl
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao fazer upload da imagem no R2: ${e.message}`
    });
  }
});

export { upload as default };
