import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Footer-CbFcuY0M.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useRouter, f as useRoute, d as useCartStore, g as useFetch } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'perfect-debounce';

const itemsPerPage = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const cartStore = useCartStore();
    const { data: apiProducts } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/products",
      "$Pt2MuF3FMO"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const products = ref(apiProducts.value || []);
    const selectedCategory = ref("todos");
    const activeSlide = ref(0);
    const selectedProduct = ref(null);
    const activeImageIndex = ref(0);
    const isCartOpen = ref(false);
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
    });
    const featuredProducts = computed(() => {
      return products.value.filter((p) => p.featured);
    });
    const filteredProducts = computed(() => {
      if (selectedCategory.value === "todos") {
        return products.value;
      }
      return products.value.filter((p) => {
        const cats = p.categories || (p.category ? [p.category] : []);
        return cats.includes(selectedCategory.value);
      });
    });
    watch(
      () => route.query.category,
      (newCat) => {
        if (newCat) {
          selectedCategory.value = String(newCat);
        } else {
          selectedCategory.value = "todos";
        }
        currentPage.value = 1;
      },
      { immediate: true }
    );
    const { data: apiCategories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/categories",
      "$yaU0OY5M2D"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const categories = ref(apiCategories.value || []);
    ref(0);
    ref(0);
    ref(0);
    ref(0);
    function formatPrice(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
    function getFirstImage(product) {
      if (product.images && product.images.length > 0) {
        return product.images[0] || product.image;
      }
      return product.image;
    }
    function toggleCart() {
      isCartOpen.value = !isCartOpen.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white flex flex-col" }, _attrs))} data-v-1bd14dc0>`);
      _push(ssrRenderComponent(_component_Header, { onToggleCart: toggleCart }, null, _parent));
      if (featuredProducts.value.length > 0) {
        _push(`<section id="destaques-section" class="relative w-full" data-v-1bd14dc0><div class="carousel-container-full" data-v-1bd14dc0><!--[-->`);
        ssrRenderList(featuredProducts.value, (product, index2) => {
          _push(`<div class="${ssrRenderClass([index2 === activeSlide.value ? "opacity-100 z-10" : "opacity-0 z-0", "carousel-slide"])}" data-v-1bd14dc0><div class="carousel-overlay" data-v-1bd14dc0></div><img${ssrRenderAttr("src", getFirstImage(product))}${ssrRenderAttr("alt", product.name)} class="absolute inset-0 w-full h-full object-cover"${ssrRenderAttr("loading", index2 === 0 ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", index2 === 0 ? "high" : "auto")} data-v-1bd14dc0><div class="absolute inset-0 z-20 flex items-end pb-9 pt-6 px-6 md:p-12 text-white" data-v-1bd14dc0><div class="max-w-6xl mx-auto w-full px-4 md:px-0" data-v-1bd14dc0><span class="text-xs font-bold uppercase tracking-wider text-crimson bg-white px-3 py-1 rounded-full w-max mb-2 shadow-sm" data-v-1bd14dc0> Destaque Sazonal </span><h2 class="text-2xl md:text-4xl font-extrabold line-clamp-2 leading-tight max-w-2xl text-white" data-v-1bd14dc0>${ssrInterpolate(product.name)}</h2><p class="text-sm md:text-base text-white/90 line-clamp-2 mt-1.5 mb-4 max-w-xl leading-relaxed" data-v-1bd14dc0>${ssrInterpolate(product.description)}</p><div class="flex items-center space-x-4" data-v-1bd14dc0><span class="text-xl font-bold" data-v-1bd14dc0>${ssrInterpolate(formatPrice(product.price))}</span><button class="btn-primary" data-v-1bd14dc0>Adicionar</button></div></div></div></div>`);
        });
        _push(`<!--]--><button class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" data-v-1bd14dc0></path></svg></button><button class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-1bd14dc0></path></svg></button><div class="carousel-dots" data-v-1bd14dc0><!--[-->`);
        ssrRenderList(featuredProducts.value, (_, index2) => {
          _push(`<span class="${ssrRenderClass([{ "carousel-dot-active": index2 === activeSlide.value }, "carousel-dot"])}" data-v-1bd14dc0></span>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="max-w-6xl mx-auto px-4 pt-8 space-y-8 flex-grow min-w-0 w-full" data-v-1bd14dc0><section class="space-y-3 max-w-full overflow-hidden" data-v-1bd14dc0><h3 class="text-lg font-bold text-burgundy tracking-tight" data-v-1bd14dc0>Categorias</h3><div class="flex w-full gap-3 md:gap-4 pb-4 overflow-x-auto scrollbar-none" data-v-1bd14dc0><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<div class="${ssrRenderClass([selectedCategory.value === cat.id ? "border-burgundy scale-105 shadow-md -translate-y-0.5" : "border-transparent opacity-85 hover:opacity-100 hover:scale-[1.02]", "relative rounded-2xl overflow-hidden w-[130px] shrink-0 h-20 md:flex-1 md:w-auto md:h-24 cursor-pointer select-none transition-all duration-300 ease-in-out border-2 shadow-sm"])}" data-v-1bd14dc0><img${ssrRenderAttr("src", cat.image)}${ssrRenderAttr("alt", cat.name)} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none" loading="lazy" data-v-1bd14dc0><div class="${ssrRenderClass([selectedCategory.value === cat.id ? "bg-[#780000]/55" : "bg-black/45", "absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-colors duration-300 p-2 text-center"])}" data-v-1bd14dc0><span class="font-bold text-xs md:text-sm tracking-wide uppercase text-white shadow-sm" data-v-1bd14dc0>${ssrInterpolate(cat.name)}</span></div></div>`);
      });
      _push(`<!--]--></div></section><section class="space-y-4" data-v-1bd14dc0><div class="flex justify-between items-center" data-v-1bd14dc0><h3 class="text-lg font-bold text-burgundy tracking-tight" data-v-1bd14dc0>${ssrInterpolate(categories.value.find((c) => c.id === selectedCategory.value)?.name.split(" ").slice(1).join(" "))}</h3><span class="text-xs text-burgundy/60 font-medium" data-v-1bd14dc0>${ssrInterpolate(filteredProducts.value.length)} itens encontrados </span></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-1bd14dc0><!--[-->`);
      ssrRenderList(paginatedProducts.value, (product) => {
        _push(`<div class="product-card-glass group cursor-pointer" data-v-1bd14dc0>`);
        if (product.oldPrice) {
          _push(`<div class="absolute top-2 left-2 z-10" data-v-1bd14dc0><span class="badge-discount" data-v-1bd14dc0>Oferta</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="aspect-[9/16] w-full rounded-xl overflow-hidden mb-3 bg-neutral-200/50 relative" data-v-1bd14dc0><img${ssrRenderAttr("src", getFirstImage(product))}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" data-v-1bd14dc0></div><div class="flex flex-col flex-grow justify-between" data-v-1bd14dc0><div data-v-1bd14dc0><h4 class="font-bold text-sm text-neutral-800 line-clamp-2 leading-snug group-hover:text-burgundy transition-colors" data-v-1bd14dc0>${ssrInterpolate(product.name)}</h4><p class="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed" data-v-1bd14dc0>${ssrInterpolate(product.description)}</p></div><div class="mt-3" data-v-1bd14dc0><div class="flex items-center space-x-1.5" data-v-1bd14dc0>`);
        if (product.oldPrice) {
          _push(`<span class="text-xs text-neutral-400 line-through" data-v-1bd14dc0>${ssrInterpolate(formatPrice(product.oldPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-sm font-extrabold text-burgundy" data-v-1bd14dc0>${ssrInterpolate(formatPrice(product.price))}</span></div><div class="text-[10px] text-neutral-500 font-medium mt-0.5" data-v-1bd14dc0>${ssrInterpolate(product.installments)}</div><button class="btn-primary-sm w-full mt-3 flex items-center justify-center space-x-1" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-1bd14dc0></path></svg><span data-v-1bd14dc0>Adicionar</span></button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (totalPages.value > 1) {
        _push(`<div class="flex justify-center items-center gap-1.5 mt-8 py-4" data-v-1bd14dc0><button class="px-3 py-1.5 rounded-xl border border-burgundy/10 text-burgundy font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-all cursor-pointer"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-1bd14dc0> Anterior </button><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([currentPage.value === page ? "bg-burgundy text-white border-burgundy shadow-md" : "border-burgundy/10 text-burgundy hover:bg-neutral-100", "w-9 h-9 rounded-xl border text-xs font-bold transition-all cursor-pointer"])}" data-v-1bd14dc0>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button class="px-3 py-1.5 rounded-xl border border-burgundy/10 text-burgundy font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-all cursor-pointer"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-1bd14dc0> Próxima </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      if (selectedProduct.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4" data-v-1bd14dc0><div class="bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" data-v-1bd14dc0><div class="w-12 h-1 bg-neutral-300 rounded-full mx-auto my-3 md:hidden" data-v-1bd14dc0></div><div class="flex justify-between items-center px-6 py-2 md:py-4 border-b border-neutral-100" data-v-1bd14dc0><h3 class="font-bold text-burgundy text-lg" data-v-1bd14dc0>Detalhes do Presente</h3><button class="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-1bd14dc0><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-1bd14dc0></path></svg></button></div><div class="overflow-y-auto p-6 space-y-5" data-v-1bd14dc0><div class="space-y-3" data-v-1bd14dc0><div class="aspect-square w-full rounded-2xl overflow-hidden bg-white/20 relative group" data-v-1bd14dc0><img${ssrRenderAttr(
          "src",
          selectedProduct.value.images && selectedProduct.value.images.length > 0 ? selectedProduct.value.images[activeImageIndex.value] : selectedProduct.value.image
        )}${ssrRenderAttr("alt", selectedProduct.value.name)} class="w-full h-full object-cover transition-all duration-300 select-none" draggable="false" data-v-1bd14dc0>`);
        if (selectedProduct.value.images && selectedProduct.value.images.length > 1) {
          _push(`<!--[--><button class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" data-v-1bd14dc0></path></svg></button><button class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-1bd14dc0></path></svg></button><div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10" data-v-1bd14dc0><!--[-->`);
          ssrRenderList(selectedProduct.value.images, (_, idx) => {
            _push(`<span class="${ssrRenderClass([idx === activeImageIndex.value ? "bg-white w-3" : "bg-white/40", "w-1.5 h-1.5 rounded-full transition-all duration-300"])}" data-v-1bd14dc0></span>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (selectedProduct.value.images && selectedProduct.value.images.length > 1) {
          _push(`<div class="flex space-x-2 overflow-x-auto pb-1 scrollbar-none justify-center" data-v-1bd14dc0><!--[-->`);
          ssrRenderList(selectedProduct.value.images, (img, idx) => {
            _push(`<img${ssrRenderAttr("src", img)}${ssrRenderAttr("alt", `${selectedProduct.value.name} vista ${idx + 1}`)} class="${ssrRenderClass([
              idx === activeImageIndex.value ? "gallery-thumbnail-active" : "gallery-thumbnail-inactive",
              "gallery-thumbnail"
            ])}" data-v-1bd14dc0>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-1.5" data-v-1bd14dc0><h2 class="text-xl font-bold text-neutral-800 leading-snug" data-v-1bd14dc0>${ssrInterpolate(selectedProduct.value.name)}</h2><div class="flex items-center space-x-2" data-v-1bd14dc0><span class="badge-discount text-[10px]" data-v-1bd14dc0>${ssrInterpolate(selectedProduct.value?.categories ? selectedProduct.value.categories.map((catId) => categories.value.find((c) => c.id === catId)?.name || catId).join(", ") : categories.value.find((c) => c.id === selectedProduct.value?.category)?.name)}</span><span class="text-xs text-neutral-500 font-medium" data-v-1bd14dc0>${ssrInterpolate(selectedProduct.value.installments)}</span></div></div><p class="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100" data-v-1bd14dc0>${ssrInterpolate(selectedProduct.value.description)}</p><div class="flex items-center justify-between border-t border-neutral-100 pt-4" data-v-1bd14dc0><div class="flex flex-col" data-v-1bd14dc0><span class="text-xs text-neutral-400 font-medium" data-v-1bd14dc0>Preço</span><div class="flex items-baseline space-x-2" data-v-1bd14dc0>`);
        if (selectedProduct.value.oldPrice) {
          _push(`<span class="text-sm text-neutral-400 line-through" data-v-1bd14dc0>${ssrInterpolate(formatPrice(selectedProduct.value.oldPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-2xl font-black text-burgundy" data-v-1bd14dc0>${ssrInterpolate(formatPrice(selectedProduct.value.price))}</span></div></div><button class="btn-primary flex items-center space-x-2 px-8 py-3" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-1bd14dc0></path></svg><span data-v-1bd14dc0>Comprar</span></button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isCartOpen.value) {
        _push(`<div class="cart-drawer-overlay" data-v-1bd14dc0></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isCartOpen.value) {
        _push(`<div class="cart-drawer" data-v-1bd14dc0><div class="flex items-center justify-between px-6 py-5 border-b border-burgundy/15" data-v-1bd14dc0><div class="flex items-center space-x-2" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-1bd14dc0></path></svg><h3 class="font-extrabold text-burgundy text-lg" data-v-1bd14dc0>Meu Carrinho</h3></div><button class="p-2 hover:bg-burgundy/5 text-burgundy rounded-full transition-colors" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-1bd14dc0></path></svg></button></div><div class="flex-grow overflow-y-auto p-6 space-y-4" data-v-1bd14dc0>`);
        if (unref(cartStore).items.length === 0) {
          _push(`<div class="h-full flex flex-col items-center justify-center text-center space-y-4" data-v-1bd14dc0><div class="p-4 bg-white/40 rounded-full text-burgundy/40" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-1bd14dc0></path></svg></div><div data-v-1bd14dc0><p class="font-bold text-burgundy" data-v-1bd14dc0>Seu carrinho está vazio</p><p class="text-xs text-neutral-500 mt-1" data-v-1bd14dc0> Adicione presentes florais para demonstrar seu afeto! </p></div><button class="btn-primary-sm mt-2" data-v-1bd14dc0>Continuar Comprando</button></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(cartStore).items, (item) => {
            _push(`<div class="flex items-center space-x-4 bg-white/45 p-3 rounded-2xl border border-white/40 relative shadow-sm" data-v-1bd14dc0><img${ssrRenderAttr("src", getFirstImage(item.product))}${ssrRenderAttr("alt", item.product.name)} class="w-16 h-16 rounded-xl object-cover" data-v-1bd14dc0><div class="flex-grow min-w-0" data-v-1bd14dc0><h4 class="font-bold text-xs text-neutral-800 truncate" data-v-1bd14dc0>${ssrInterpolate(item.product.name)}</h4><span class="text-xs font-semibold text-burgundy block mt-0.5" data-v-1bd14dc0>${ssrInterpolate(formatPrice(item.product.price))}</span><div class="flex items-center space-x-2 mt-2" data-v-1bd14dc0><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90" data-v-1bd14dc0> - </button><span class="text-xs font-bold text-neutral-700 w-4 text-center" data-v-1bd14dc0>${ssrInterpolate(item.quantity)}</span><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90" data-v-1bd14dc0> + </button></div></div><button class="p-1.5 text-neutral-400 hover:text-crimson transition-colors self-start" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-1bd14dc0></path></svg></button></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
        if (unref(cartStore).items.length > 0) {
          _push(`<div class="border-t border-burgundy/15 bg-white/20 p-6 space-y-4" data-v-1bd14dc0><div class="flex justify-between items-center text-neutral-800" data-v-1bd14dc0><span class="font-medium text-sm" data-v-1bd14dc0>Subtotal:</span><span class="font-extrabold text-lg text-burgundy" data-v-1bd14dc0>${ssrInterpolate(formatPrice(unref(cartStore).cartTotal))}</span></div><button class="btn-primary w-full py-3.5 flex items-center justify-center space-x-2 text-sm" data-v-1bd14dc0><span data-v-1bd14dc0>Finalizar Compra</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-1bd14dc0></path></svg></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mobile-navigation-bar" data-v-1bd14dc0><button class="${ssrRenderClass([{ "mobile-nav-item-active": selectedCategory.value === "todos" }, "mobile-nav-item"])}" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-1bd14dc0></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-1bd14dc0>Início</span></button><button class="${ssrRenderClass([{ "mobile-nav-item-active": selectedCategory.value === "destaques" }, "mobile-nav-item"])}" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" data-v-1bd14dc0></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-1bd14dc0>Destaques</span></button><button class="mobile-nav-item relative" data-v-1bd14dc0><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1bd14dc0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-1bd14dc0></path></svg>`);
      if (unref(cartStore).cartItemsCount > 0) {
        _push(`<span class="cart-badge bg-crimson w-4 h-4 text-[9px] top-1 right-3" data-v-1bd14dc0>${ssrInterpolate(unref(cartStore).cartItemsCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-[10px] mt-0.5 font-semibold" data-v-1bd14dc0>Carrinho</span></button><a href="https://wa.me/5567999476896?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!" target="_blank" class="mobile-nav-item" data-v-1bd14dc0><svg viewBox="0 0 24 24" class="h-5.5 w-5.5 fill-current" xmlns="http://www.w3.org/2000/svg" data-v-1bd14dc0><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-1bd14dc0></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-1bd14dc0>Contato</span></a></div><a href="https://wa.me/5567999476896?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!" target="_blank" class="hidden md:flex fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 items-center justify-center" title="Fale conosco no WhatsApp" data-v-1bd14dc0><svg viewBox="0 0 24 24" class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" data-v-1bd14dc0><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-1bd14dc0></path></svg></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bd14dc0"]]);

export { index as default };
