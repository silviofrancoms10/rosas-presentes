import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { u as useDB } from '../../_/cloudflare.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const categories = defineEventHandler(async (event) => {
  try {
    const db = useDB(event);
    const { results } = await db.prepare("SELECT * FROM categories ORDER BY id ASC").all();
    return results || [];
  } catch (e) {
    return [
      { id: "todos", name: "Todos", image: "/images/categorias/categoria-todos.jpg" },
      { id: "destaques", name: "Destaques", image: "/images/categorias/categoria-todos.jpg" },
      { id: "buques", name: "Buqu\xEAs", image: "/images/categorias/categoria-buques.jpg" },
      { id: "cestas", name: "Cestas", image: "/images/categorias/categoria-cestas.jpg" },
      { id: "presentes", name: "Presentes", image: "/images/categorias/categoria-presentes.jpg" }
    ];
  }
});

export { categories as default };
