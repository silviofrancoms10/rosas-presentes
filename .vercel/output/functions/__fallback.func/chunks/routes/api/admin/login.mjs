import { d as defineEventHandler, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const login = defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }
  const body = await readBody(event);
  const secret = process.env.ADMIN_SECRET;
  if (!secret || body.password !== secret) {
    throw createError({ statusCode: 401, statusMessage: "Senha incorreta" });
  }
  return { ok: true, token: secret };
});

export { login as default };
