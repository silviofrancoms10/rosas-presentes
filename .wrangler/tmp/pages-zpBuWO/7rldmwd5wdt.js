// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_nuxt/*",
    "/favicon.ico",
    "/images/categorias/categoria-buques.jpg",
    "/images/categorias/categoria-cestas.jpg",
    "/images/categorias/categoria-presentes.jpg",
    "/images/categorias/categoria-todos.jpg",
    "/images/produtos/arranjo-girassois.jpg",
    "/images/produtos/box-vinho-rosas.jpg",
    "/images/produtos/buque-rosas-vermelhas-detail.jpg",
    "/images/produtos/buque-rosas-vermelhas.jpg",
    "/images/produtos/cesta-cafe-premium-detail.jpg",
    "/images/produtos/cesta-cafe-premium.jpg",
    "/images/produtos/cesta-chocolates.jpg",
    "/images/produtos/rosa-encantada-detail.jpg",
    "/images/produtos/rosa-encantada.jpg",
    "/images/produtos/screenshot-from-2026-07-12-16-18-56.png"
  ]
};

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/franco/Documents/front/rosas-presentes/.wrangler/tmp/pages-zpBuWO/bundledWorker-0.10468599185183936.mjs";
import { isRoutingRuleMatch } from "/home/franco/Documents/front/rosas-presentes/node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/franco/Documents/front/rosas-presentes/.wrangler/tmp/pages-zpBuWO/bundledWorker-0.10468599185183936.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=7rldmwd5wdt.js.map
