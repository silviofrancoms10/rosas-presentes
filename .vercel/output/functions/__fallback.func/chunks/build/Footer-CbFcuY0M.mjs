import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useRouter, f as useRoute, d as useCartStore, g as useFetch } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["toggle-cart"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const cartStore = useCartStore();
    const { data: categoriesData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/categories",
      "$0so8KvRc9s"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => categoriesData.value || []);
    const currentCategory = computed(() => {
      return route.query.category || "todos";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-glass" }, _attrs))}><div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"><div class="flex items-center space-x-2 cursor-pointer"><span class="text-xl md:text-2xl font-bold tracking-tight">🌹 Rosas Presentes</span></div><nav class="hidden md:flex items-center space-x-6 text-sm font-semibold"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<button class="${ssrRenderClass([currentCategory.value === cat.id ? "text-white border-white" : "text-almond/75 border-transparent", "hover:text-white transition-colors cursor-pointer pb-1 border-b-2"])}">${ssrInterpolate(cat.name)}</button>`);
      });
      _push(`<!--]--></nav><button class="relative p-2.5 hover:bg-white/10 rounded-xl transition-all"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`);
      if (unref(cartStore).cartItemsCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 bg-white text-burgundy text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white/20 animate-pulse">${ssrInterpolate(unref(cartStore).cartItemsCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "Header" });
const whatsappNumber = "5567999476896";
const mapsLink = "https://www.google.com/maps/search/?api=1&query=Rua+Benito+Melch%C3%ADades+de+Oliveira,+227+-+Nasser,+Campo+Grande+-+MS,+79117-320";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-b from-[#4a0000] to-[#2d0000] text-neutral-100 pt-16 pb-24 md:pb-8 px-4 border-t border-white/10 mt-16 relative overflow-hidden" }, _attrs))}><div class="absolute -top-24 -left-24 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -bottom-24 -right-24 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl pointer-events-none"></div><div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 relative z-10"><div class="flex-1 space-y-5"><div class="flex items-center space-x-2"><span class="text-2xl font-bold tracking-tight text-white drop-shadow-sm">🌹 Rosas Presentes</span></div><p class="text-sm text-neutral-300/90 leading-relaxed"> Especializada em floricultura, cestas de café da manhã, buquês e presentes especiais para emocionar quem você ama em Campo Grande - MS. </p><div class="space-y-3.5 pt-2"><a${ssrRenderAttr("href", whatsappLink)} target="_blank" class="flex items-center space-x-3 text-sm text-neutral-200 hover:text-[#25d366] transition-colors group w-max"><div class="p-2 bg-white/5 group-hover:bg-[#25d366]/10 rounded-xl transition-colors border border-white/5 group-hover:border-[#25d366]/20"><svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg></div><span class="font-semibold text-white group-hover:text-white transition-colors">(67) 99947-6896</span></a><a${ssrRenderAttr("href", mapsLink)} target="_blank" class="flex items-start space-x-3 text-sm text-neutral-300 hover:text-white transition-colors group"><div class="p-2 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5 mt-0.5 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><span class="leading-relaxed"> Rua Benito Melchíades de Oliveira, 227 - Nasser / Coophasul, Campo Grande - MS, 79117-320 </span></a></div></div><div class="flex-1 space-y-5"><h4 class="text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2"> Avisos e Funcionamento </h4><div class="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4 text-sm"><div class="space-y-2"><h5 class="font-semibold text-white flex items-center space-x-2 text-crimson-light"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-crimson shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Horários em Datas Comemorativas</span></h5><p class="text-neutral-300 leading-relaxed text-xs"> No <strong class="text-white">Dia das Mães</strong> e <strong class="text-white">Dia dos Namorados</strong> (e vésperas), nossas entregas iniciam a partir das <strong class="text-white">05:00h</strong> da manhã, com atendimento presencial a partir das <strong class="text-white">06:00h</strong> e atendimento via WhatsApp a partir das <strong class="text-white">08:00h</strong>. </p></div><div class="border-t border-white/10 pt-3.5 space-y-2"><h5 class="font-semibold text-white flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>Política de Entrega</span></h5><p class="text-neutral-300 leading-relaxed text-xs"> Caso seja realizada a tentativa de entrega e o destinatário não esteja no local, será cobrada uma taxa de reentrega para a nova tentativa, ou o comprador poderá retirar o presente diretamente em nossa loja física. </p></div></div></div></div><div class="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 relative z-10"><div class="flex flex-col md:flex-row justify-between items-center gap-6"><div class="space-y-2 text-center md:text-left"><h4 class="text-sm font-bold text-white tracking-wide">Formas de Pagamento Aceitas</h4><div class="flex flex-wrap justify-center md:justify-start gap-2.5 text-xs text-neutral-300"><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg class="h-4.5 w-4.5 text-[#32bcad] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.002 2.695L2.695 12l9.307 9.305L21.305 12l-9.303-9.305zm0 15.61L5.695 12l6.307-6.305L18.305 12l-6.303 6.305z"></path><path d="M12.002 6.695L6.695 12l5.307 5.305L17.305 12l-5.303-5.305zm0 7.61L9.695 12l2.307-2.305L14.305 12l-2.303 2.305z"></path></svg><span class="font-medium">Pix</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span class="font-medium">Cartão de Crédito / Débito</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span class="font-medium">Link de Pagamento (Seguro)</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="font-medium">Depósito / Transferência Bancária</span></span></div><p class="text-[11px] text-neutral-400 mt-1 italic"> * Sempre após efetuar o pagamento, favor enviar o comprovante de pagamento via WhatsApp. </p></div></div></div><div class="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 gap-4"><p>© 2026 Rosas &amp; Presentes. Todos os direitos reservados.</p><div class="flex items-center space-x-1"><span>Desenvolvido com</span><span class="text-crimson text-sm">♥</span><span><a href="https://dsdesenvolvimento.vercel.app/"></a>por DS Desenvolvimento</span></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "Footer" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
