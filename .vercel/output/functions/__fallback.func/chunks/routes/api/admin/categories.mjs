import { d as defineEventHandler, c as createError, r as readBody, g as getHeader } from '../../../nitro/nitro.mjs';
import { u as useDB } from '../../../_/cloudflare.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

function checkAuth(event) {
  var _a;
  const secret = process.env.ADMIN_SECRET;
  const auth = (_a = getHeader(event, "authorization")) != null ? _a : "";
  const token = auth.replace("Bearer ", "").trim();
  if (!secret || token !== secret) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
}
const categories = defineEventHandler(async (event) => {
  checkAuth(event);
  if (event.method !== "PUT") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }
  const body = await readBody(event);
  if (!body.id || !body.name || !body.image) {
    throw createError({ statusCode: 400, statusMessage: "id, name e image s\xE3o obrigat\xF3rios" });
  }
  const db = useDB(event);
  try {
    await db.prepare("UPDATE categories SET name = ?, image = ? WHERE id = ?").bind(body.name, body.image, body.id).run();
    return { ok: true };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao atualizar categoria no Cloudflare D1: ${e.message}`
    });
  }
});

export { categories as default };
