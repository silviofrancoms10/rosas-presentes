import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { u as useDB } from '../../_/cloudflare.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const products = defineEventHandler(async (event) => {
  const db = useDB(event);
  try {
    const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    return (results || []).map((row) => ({
      ...row,
      featured: row.featured === 1,
      categories: JSON.parse(row.categories || "[]"),
      images: JSON.parse(row.images || "[]")
    }));
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao buscar produtos no Cloudflare D1: ${e.message}`
    });
  }
});

export { products as default };
