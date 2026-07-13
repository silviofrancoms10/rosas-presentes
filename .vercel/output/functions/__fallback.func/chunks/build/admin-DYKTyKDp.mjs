import { defineComponent, ref, watch, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const token = ref("");
    const password = ref("");
    const loginError = ref("");
    const isLoggingIn = ref(false);
    const products = ref([]);
    const isLoading = ref(false);
    const saveError = ref("");
    const categoryOptions = ["buques", "cestas", "presentes", "destaques"];
    function parsePrice(val) {
      if (val === void 0 || val === null || val === "") return 0;
      const str = String(val).trim();
      const normalized = str.replace(",", ".");
      const num = Number(normalized);
      return isNaN(num) ? 0 : num;
    }
    const emptyForm = () => ({
      id: "",
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      category: "buques",
      categories: ["buques"],
      image: "",
      images: [],
      featured: false,
      installments: ""
    });
    const form = ref(emptyForm());
    const installmentOption = ref("");
    const editingId = ref(null);
    const showForm = ref(false);
    const tab = ref("products");
    const deleteConfirmId = ref(null);
    const successMsg = ref("");
    const categories = ref([]);
    const isCategoriesLoading = ref(false);
    const categoryForm = ref({
      id: "",
      name: "",
      image: ""
    });
    const showCategoryForm = ref(false);
    const isUploadingCategory = ref(false);
    const categoryUploadError = ref("");
    watch([() => form.value.price, installmentOption], () => {
      if (installmentOption.value === "") {
        form.value.installments = "";
      } else if (installmentOption.value === "2") {
        const numericPrice = parsePrice(form.value.price);
        const val = numericPrice / 2;
        form.value.installments = `2x de R$ ${val.toFixed(2).replace(".", ",")} sem juros`;
      } else if (installmentOption.value === "3") {
        const numericPrice = parsePrice(form.value.price);
        const val = numericPrice / 3;
        form.value.installments = `3x de R$ ${val.toFixed(2).replace(".", ",")} sem juros`;
      }
    });
    const uploadingIdx = ref(null);
    const uploadError = ref("");
    const featuredProducts = computed(() => products.value.filter((p) => p.featured));
    function formatPrice(v) {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-neutral-100 font-sans" }, _attrs))} data-v-85452cd9>`);
      if (!token.value) {
        _push(`<div class="min-h-screen flex items-center justify-center p-4" data-v-85452cd9><div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-neutral-200" data-v-85452cd9><div class="text-center mb-8" data-v-85452cd9><div class="w-16 h-16 bg-burgundy rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-85452cd9></path></svg></div><h1 class="text-2xl font-extrabold text-burgundy" data-v-85452cd9>Painel Admin</h1><p class="text-sm text-neutral-500 mt-1" data-v-85452cd9>Rosas Presentes</p></div><form class="space-y-4" data-v-85452cd9><div data-v-85452cd9><label class="block text-xs font-semibold text-neutral-600 mb-1.5" data-v-85452cd9>Senha de Acesso</label><input${ssrRenderAttr("value", password.value)} type="password" placeholder="••••••••••••" class="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all" autocomplete="current-password" data-v-85452cd9></div>`);
        if (loginError.value) {
          _push(`<p class="text-xs text-red-600 font-medium" data-v-85452cd9>${ssrInterpolate(loginError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit"${ssrIncludeBooleanAttr(isLoggingIn.value || !password.value) ? " disabled" : ""} class="w-full bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-85452cd9>${ssrInterpolate(isLoggingIn.value ? "Entrando..." : "Entrar")}</button></form><p class="text-[11px] text-center text-neutral-400 mt-6" data-v-85452cd9> Acesso restrito ao administrador da loja. </p></div></div>`);
      } else {
        _push(`<div data-v-85452cd9><header class="bg-burgundy text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40" data-v-85452cd9><div class="flex items-center space-x-3" data-v-85452cd9><div class="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-85452cd9></path></svg></div><div data-v-85452cd9><h1 class="font-extrabold text-base leading-none" data-v-85452cd9>Painel Admin</h1><p class="text-white/60 text-[11px]" data-v-85452cd9>Rosas Presentes</p></div></div><div class="flex items-center space-x-3" data-v-85452cd9><a href="/" target="_blank" class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-85452cd9></path></svg><span data-v-85452cd9>Ver loja</span></a><button class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-85452cd9></path></svg><span data-v-85452cd9>Sair</span></button></div></header>`);
        if (successMsg.value) {
          _push(`<div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-pulse" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" data-v-85452cd9></path></svg><span data-v-85452cd9>${ssrInterpolate(successMsg.value)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="max-w-6xl mx-auto px-4 pt-6" data-v-85452cd9><div class="flex space-x-2 mb-6" data-v-85452cd9><button class="${ssrRenderClass([tab.value === "products" ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-85452cd9>Produtos</button><button class="${ssrRenderClass([tab.value === "categories" ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-85452cd9>Categorias</button><button class="${ssrRenderClass([tab.value === "guide" ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-85452cd9>Como usar</button></div>`);
        if (tab.value === "products") {
          _push(`<div data-v-85452cd9><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-v-85452cd9><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-85452cd9><p class="text-xs text-neutral-500 font-medium" data-v-85452cd9>Total produtos</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-85452cd9>${ssrInterpolate(products.value.length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-85452cd9><p class="text-xs text-neutral-500 font-medium" data-v-85452cd9>Destaques (banners)</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-85452cd9>${ssrInterpolate(featuredProducts.value.length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-85452cd9><p class="text-xs text-neutral-500 font-medium" data-v-85452cd9>Buquês</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-85452cd9>${ssrInterpolate(products.value.filter((p) => p.category === "buques").length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-85452cd9><p class="text-xs text-neutral-500 font-medium" data-v-85452cd9>Cestas/Presentes</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-85452cd9>${ssrInterpolate(products.value.filter((p) => p.category === "cestas" || p.category === "presentes").length)}</p></div></div><div class="flex items-center justify-between mb-4" data-v-85452cd9><h2 class="font-extrabold text-lg text-neutral-800" data-v-85452cd9>Catálogo de Produtos</h2><button class="bg-burgundy text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-2 shadow-md" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-85452cd9></path></svg><span data-v-85452cd9>Novo Produto</span></button></div>`);
          if (isLoading.value) {
            _push(`<div class="text-center py-16 text-neutral-400" data-v-85452cd9>Carregando...</div>`);
          } else {
            _push(`<div class="space-y-3" data-v-85452cd9><!--[-->`);
            ssrRenderList(products.value, (p) => {
              _push(`<div class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow" data-v-85452cd9><img${ssrRenderAttr("src", p.image)}${ssrRenderAttr("alt", p.name)} class="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-neutral-100" data-v-85452cd9><div class="flex-grow min-w-0" data-v-85452cd9><div class="flex items-center space-x-2" data-v-85452cd9><h3 class="font-bold text-neutral-800 text-sm truncate" data-v-85452cd9>${ssrInterpolate(p.name)}</h3>`);
              if (p.featured) {
                _push(`<span class="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full shrink-0" data-v-85452cd9>Banner</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div><p class="text-xs text-neutral-500 truncate mt-0.5" data-v-85452cd9>${ssrInterpolate(p.description)}</p><div class="flex items-center space-x-3 mt-1.5" data-v-85452cd9><span class="text-sm font-extrabold text-burgundy" data-v-85452cd9>${ssrInterpolate(formatPrice(p.price))}</span>`);
              if (p.oldPrice) {
                _push(`<span class="text-xs text-neutral-400 line-through" data-v-85452cd9>${ssrInterpolate(formatPrice(p.oldPrice))}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<span class="text-[10px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded-full capitalize" data-v-85452cd9>${ssrInterpolate(p.category)}</span></div></div><div class="flex items-center space-x-2 flex-shrink-0" data-v-85452cd9><button class="p-2 rounded-xl hover:bg-burgundy/5 text-neutral-500 hover:text-burgundy transition-colors" title="Editar" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-85452cd9></path></svg></button><button class="p-2 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors" title="Remover" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-85452cd9></path></svg></button></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.value === "categories") {
          _push(`<div data-v-85452cd9><div class="flex items-center justify-between mb-4" data-v-85452cd9><h2 class="font-extrabold text-lg text-neutral-800" data-v-85452cd9>Categorias da Loja</h2></div>`);
          if (isCategoriesLoading.value) {
            _push(`<div class="text-center py-16 text-neutral-400" data-v-85452cd9>Carregando categorias...</div>`);
          } else {
            _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-85452cd9><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push(`<div class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow" data-v-85452cd9><div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200" data-v-85452cd9><img${ssrRenderAttr("src", cat.image)}${ssrRenderAttr("alt", cat.name)} class="w-full h-full object-cover" data-v-85452cd9></div><div class="flex-grow min-w-0" data-v-85452cd9><div class="flex items-center space-x-2" data-v-85452cd9><h3 class="font-bold text-neutral-800 text-sm truncate" data-v-85452cd9>${ssrInterpolate(cat.name)}</h3></div><p class="text-[11px] text-neutral-400 font-mono mt-0.5" data-v-85452cd9>ID: ${ssrInterpolate(cat.id)}</p></div><div class="flex-shrink-0" data-v-85452cd9><button class="bg-burgundy text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-1 shadow-sm cursor-pointer" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-85452cd9></path></svg><span data-v-85452cd9>Editar</span></button></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.value === "guide") {
          _push(`<div class="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-sm mb-8" data-v-85452cd9><h2 class="font-extrabold text-lg text-burgundy border-b border-burgundy/10 pb-3" data-v-85452cd9>Como usar o Painel Admin</h2><div class="space-y-6 text-sm text-neutral-700 leading-relaxed" data-v-85452cd9><div data-v-85452cd9><h3 class="font-bold text-neutral-800 mb-1" data-v-85452cd9>📦 Gerenciamento de Produtos</h3><p class="mb-2" data-v-85452cd9>Você pode listar, adicionar, editar e excluir produtos do catálogo. Os dados são armazenados diretamente no banco de dados <strong data-v-85452cd9>Cloudflare D1</strong>.</p><ul class="list-disc pl-5 space-y-1 text-xs" data-v-85452cd9><li data-v-85452cd9><strong data-v-85452cd9>Novo Produto:</strong> Clique em &quot;Novo Produto&quot;, insira um ID único (ex: <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono" data-v-85452cd9>buque-rosas-premium</code>) que não poderá ser alterado depois.</li><li data-v-85452cd9><strong data-v-85452cd9>Preços:</strong> Preencha o preço atual e, opcionalmente, o preço antigo (para exibir descontos e valor riscado).</li><li data-v-85452cd9><strong data-v-85452cd9>Banners (Destaques):</strong> Ative a opção &quot;Destaque (Banner)&quot; para exibir o produto no carrossel rotativo da página inicial.</li><li data-v-85452cd9><strong data-v-85452cd9>Associação de Categorias:</strong> Vincule o produto a uma ou mais categorias no formulário.</li></ul></div><div data-v-85452cd9><h3 class="font-bold text-neutral-800 mb-1" data-v-85452cd9>🏷️ Edição de Categorias</h3><p data-v-85452cd9>Na aba <strong data-v-85452cd9>Categorias</strong>, você pode atualizar o nome de exibição e a imagem de capa de cada categoria cadastrada. Quando você altera a imagem de uma categoria, o sistema remove automaticamente a imagem antiga do Cloudflare R2 para liberar espaço.</p></div><div data-v-85452cd9><h3 class="font-bold text-neutral-800 mb-1" data-v-85452cd9>🖼️ Upload de Imagens (Cloudflare R2)</h3><p class="mb-2" data-v-85452cd9>Não é necessário adicionar imagens manualmente no código do projeto! O painel possui upload integrado conectado diretamente ao storage do <strong data-v-85452cd9>Cloudflare R2</strong>.</p><ul class="list-disc pl-5 space-y-1 text-xs" data-v-85452cd9><li data-v-85452cd9>Formatos suportados: <strong data-v-85452cd9>PNG, JPG e JPEG</strong> de até 5MB.</li><li data-v-85452cd9><strong data-v-85452cd9>Compressão Automática:</strong> Se você enviar uma imagem muito pesada (maior que 1.1MB), o painel reduzirá suas dimensões (máximo 2560px de largura) e fará a compressão no seu navegador antes do envio. Isso melhora a velocidade de carregamento do site.</li><li data-v-85452cd9><strong data-v-85452cd9>Caminho Manual (Fallback):</strong> Caso queira usar um arquivo local da aplicação, você ainda pode digitar o caminho manual (ex: <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono" data-v-85452cd9>/images/produtos/nome.webp</code>).</li></ul></div><div class="bg-amber-50 border border-amber-200 rounded-xl p-4" data-v-85452cd9><h3 class="font-bold text-amber-800 mb-1" data-v-85452cd9>🔐 Segurança e Deploy</h3><p class="text-amber-700 text-xs mb-2" data-v-85452cd9>O acesso ao painel admin requer autenticação via token Bearer. A senha é configurada na variável de ambiente <code class="bg-amber-100 px-1 rounded font-mono" data-v-85452cd9>ADMIN_SECRET</code>.</p><p class="text-amber-700 text-xs" data-v-85452cd9>Certifique-se de configurar as seguintes variáveis no seu ambiente de produção (Cloudflare Pages/Workers) ou no seu arquivo local <code class="bg-amber-100 px-1 rounded font-mono" data-v-85452cd9>.env</code>:</p><ul class="list-disc pl-5 mt-1 text-[11px] text-amber-700 space-y-0.5 font-mono" data-v-85452cd9><li data-v-85452cd9>ADMIN_SECRET: Senha de acesso ao painel admin.</li><li data-v-85452cd9>R2_PUBLIC_URL: URL pública do bucket R2 (ex: https://pub-xxx.r2.dev).</li><li data-v-85452cd9>Bindings ativos: &quot;DB&quot; (Cloudflare D1) e &quot;BUCKET&quot; (Cloudflare R2).</li></ul></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (deleteConfirmId.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" data-v-85452cd9><div class="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4" data-v-85452cd9><div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" data-v-85452cd9></path></svg></div><h3 class="font-extrabold text-neutral-800 text-lg" data-v-85452cd9>Confirmar exclusão?</h3><p class="text-sm text-neutral-500" data-v-85452cd9>Esta ação é <strong data-v-85452cd9>irreversível</strong>. O produto será removido permanentemente do catálogo e dos banners.</p><div class="flex space-x-3" data-v-85452cd9><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-85452cd9>Cancelar</button><button class="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm" data-v-85452cd9>Remover</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showForm.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" data-v-85452cd9><div class="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[92vh]" data-v-85452cd9><div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100" data-v-85452cd9><h2 class="font-extrabold text-burgundy text-base" data-v-85452cd9>${ssrInterpolate(editingId.value ? "Editar Produto" : "Novo Produto")}</h2><button class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-85452cd9></path></svg></button></div><div class="overflow-y-auto p-6 space-y-5 flex-grow" data-v-85452cd9><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-85452cd9><div data-v-85452cd9><label class="form-label" data-v-85452cd9>ID único <span class="text-red-500" data-v-85452cd9>*</span></label><input${ssrRenderAttr("value", form.value.id)}${ssrIncludeBooleanAttr(!!editingId.value) ? " disabled" : ""} type="text" placeholder="ex: buque-04" class="form-input" data-v-85452cd9>`);
        if (!!editingId.value) {
          _push(`<p class="text-[11px] text-neutral-400 mt-1" data-v-85452cd9>ID não pode ser alterado na edição</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Nome do Produto <span class="text-red-500" data-v-85452cd9>*</span></label><input${ssrRenderAttr("value", form.value.name)} type="text" placeholder="Nome do produto" class="form-input" data-v-85452cd9></div></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Descrição</label><textarea rows="3" class="form-input resize-none" placeholder="Descreva o produto..." data-v-85452cd9>${ssrInterpolate(form.value.description)}</textarea></div><div class="grid grid-cols-2 gap-4" data-v-85452cd9><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Preço (R$) <span class="text-red-500" data-v-85452cd9>*</span></label><input${ssrRenderAttr("value", form.value.price)} type="text" class="form-input" placeholder="Ex: 150,50 ou 150.50" data-v-85452cd9></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Preço Antigo / De (opcional)</label><input${ssrRenderAttr("value", form.value.oldPrice)} type="text" class="form-input" placeholder="Ex: 190,00" data-v-85452cd9></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-85452cd9><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Opção de Parcelamento</label><select class="form-input" data-v-85452cd9><option value="" data-v-85452cd9${ssrIncludeBooleanAttr(Array.isArray(installmentOption.value) ? ssrLooseContain(installmentOption.value, "") : ssrLooseEqual(installmentOption.value, "")) ? " selected" : ""}>Sem parcelamento</option><option value="2" data-v-85452cd9${ssrIncludeBooleanAttr(Array.isArray(installmentOption.value) ? ssrLooseContain(installmentOption.value, "2") : ssrLooseEqual(installmentOption.value, "2")) ? " selected" : ""}>Calcular em 2x sem juros</option><option value="3" data-v-85452cd9${ssrIncludeBooleanAttr(Array.isArray(installmentOption.value) ? ssrLooseContain(installmentOption.value, "3") : ssrLooseEqual(installmentOption.value, "3")) ? " selected" : ""}>Calcular em 3x sem juros</option><option value="custom" data-v-85452cd9${ssrIncludeBooleanAttr(Array.isArray(installmentOption.value) ? ssrLooseContain(installmentOption.value, "custom") : ssrLooseEqual(installmentOption.value, "custom")) ? " selected" : ""}>Texto personalizado</option></select></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Texto de Parcelamento</label><input${ssrRenderAttr("value", form.value.installments)}${ssrIncludeBooleanAttr(installmentOption.value !== "custom") ? " disabled" : ""} type="text" placeholder="Calculado automaticamente..." class="form-input disabled:bg-neutral-100 disabled:cursor-not-allowed" data-v-85452cd9></div></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Categorias <span class="text-red-500" data-v-85452cd9>*</span></label><div class="flex flex-wrap gap-2 mt-1.5" data-v-85452cd9><!--[-->`);
        ssrRenderList(categoryOptions, (cat) => {
          _push(`<button type="button" class="${ssrRenderClass([form.value.categories.includes(cat) ? "bg-burgundy text-white border-burgundy" : "bg-white text-neutral-600 border-neutral-300 hover:border-burgundy", "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize"])}" data-v-85452cd9>${ssrInterpolate(cat)}</button>`);
        });
        _push(`<!--]--></div><p class="text-[11px] text-neutral-400 mt-1.5" data-v-85452cd9>A primeira categoria selecionada será a principal. &quot;destaques&quot; aparece no carrossel de banners.</p></div><div class="flex items-center space-x-3 bg-amber-50 border border-amber-200 rounded-xl p-4" data-v-85452cd9><input id="featured-toggle"${ssrIncludeBooleanAttr(Array.isArray(form.value.featured) ? ssrLooseContain(form.value.featured, null) : form.value.featured) ? " checked" : ""} type="checkbox" class="h-5 w-5 accent-burgundy cursor-pointer" data-v-85452cd9><label for="featured-toggle" class="cursor-pointer" data-v-85452cd9><span class="text-sm font-bold text-amber-800 block" data-v-85452cd9>Destaque (Banner)</span><span class="text-xs text-amber-600" data-v-85452cd9>Aparece no carrossel principal da página inicial</span></label></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Imagens do Produto</label><p class="text-[11px] text-neutral-400 mb-3" data-v-85452cd9>A 1ª imagem é a capa. Faça upload direto (PNG, JPG, JPEG — máx. 5MB) ou cole uma URL manualmente.</p><div class="space-y-3" data-v-85452cd9><!--[-->`);
        ssrRenderList(form.value.images, (img, idx) => {
          _push(`<div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-3 space-y-2" data-v-85452cd9><div class="flex items-start space-x-3" data-v-85452cd9><div class="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300" data-v-85452cd9>`);
          if (img) {
            _push(`<img${ssrRenderAttr("src", img)} class="w-full h-full object-cover"${ssrRenderAttr("alt", `Imagem ${idx + 1}`)} data-v-85452cd9>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center text-neutral-400" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-85452cd9></path></svg></div>`);
          }
          if (uploadingIdx.value === idx) {
            _push(`<div class="absolute inset-0 bg-white/80 flex items-center justify-center" data-v-85452cd9><svg class="animate-spin h-6 w-6 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-85452cd9><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-85452cd9></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-85452cd9></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-grow space-y-2" data-v-85452cd9><div class="flex items-center space-x-1.5" data-v-85452cd9><span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider" data-v-85452cd9>${ssrInterpolate(idx === 0 ? "Capa (principal)" : `Imagem ${idx + 1}`)}</span></div><label class="${ssrRenderClass([uploadingIdx.value === idx ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-burgundy hover:text-burgundy", "flex items-center space-x-2 border-2 border-dashed border-neutral-300 text-neutral-500 text-xs font-semibold px-3 py-2 rounded-xl transition-colors w-full"])}" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-85452cd9></path></svg><span data-v-85452cd9>${ssrInterpolate(uploadingIdx.value === idx ? "Enviando..." : "Clique para fazer upload (PNG, JPG, JPEG)")}</span><input type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" class="hidden"${ssrIncludeBooleanAttr(uploadingIdx.value === idx) ? " disabled" : ""} data-v-85452cd9></label><input${ssrRenderAttr("value", img)} type="text" placeholder="Ou cole a URL manualmente: /images/produtos/foto.jpg" class="form-input text-xs" data-v-85452cd9></div><button type="button" class="p-1.5 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1" title="Remover imagem" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-85452cd9></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (uploadError.value) {
          _push(`<p class="text-xs text-red-600 font-semibold mt-2 flex items-center space-x-1" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" data-v-85452cd9></path></svg><span data-v-85452cd9>${ssrInterpolate(uploadError.value)}</span></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="mt-3 text-xs text-burgundy font-semibold flex items-center space-x-1.5 hover:underline" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-85452cd9></path></svg><span data-v-85452cd9>Adicionar outra imagem</span></button></div>`);
        if (saveError.value) {
          _push(`<p class="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3" data-v-85452cd9>${ssrInterpolate(saveError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="px-6 py-4 border-t border-neutral-100 flex space-x-3" data-v-85452cd9><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-85452cd9>Cancelar</button><button class="flex-1 bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md" data-v-85452cd9>${ssrInterpolate(editingId.value ? "Salvar Alterações" : "Criar Produto")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showCategoryForm.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" data-v-85452cd9><div class="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]" data-v-85452cd9><div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100" data-v-85452cd9><h2 class="font-extrabold text-burgundy text-base" data-v-85452cd9>Editar Categoria</h2><button class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-85452cd9></path></svg></button></div><div class="p-6 space-y-5 overflow-y-auto" data-v-85452cd9><div data-v-85452cd9><label class="form-label" data-v-85452cd9>ID da Categoria</label><input${ssrRenderAttr("value", categoryForm.value.id)} disabled type="text" class="form-input bg-neutral-100 cursor-not-allowed" data-v-85452cd9></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Nome da Categoria <span class="text-red-500" data-v-85452cd9>*</span></label><input${ssrRenderAttr("value", categoryForm.value.name)} type="text" placeholder="Ex: Buquês Especiais" class="form-input" data-v-85452cd9></div><div data-v-85452cd9><label class="form-label" data-v-85452cd9>Imagem da Categoria</label><div class="flex items-center space-x-3 bg-neutral-50 border border-neutral-200 rounded-2xl p-3" data-v-85452cd9><div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300" data-v-85452cd9>`);
        if (categoryForm.value.image) {
          _push(`<img${ssrRenderAttr("src", categoryForm.value.image)} class="w-full h-full object-cover" data-v-85452cd9>`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center text-neutral-400" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-85452cd9></path></svg></div>`);
        }
        if (isUploadingCategory.value) {
          _push(`<div class="absolute inset-0 bg-white/80 flex items-center justify-center" data-v-85452cd9><svg class="animate-spin h-5 w-5 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-85452cd9><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-85452cd9></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-85452cd9></path></svg></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex-grow space-y-2" data-v-85452cd9><label class="cursor-pointer flex items-center justify-center space-x-1.5 border border-dashed border-neutral-300 text-neutral-600 text-xs font-semibold px-3 py-2 rounded-xl hover:border-burgundy hover:text-burgundy transition-colors" data-v-85452cd9><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-85452cd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-85452cd9></path></svg><span data-v-85452cd9>Alterar Imagem</span><input type="file" accept=".png,.jpg,.jpeg" class="hidden" data-v-85452cd9></label><input${ssrRenderAttr("value", categoryForm.value.image)} type="text" placeholder="URL da Imagem" class="form-input text-xs" data-v-85452cd9></div></div></div>`);
        if (categoryUploadError.value) {
          _push(`<p class="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2" data-v-85452cd9>${ssrInterpolate(categoryUploadError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="px-6 py-4 border-t border-neutral-100 flex space-x-3" data-v-85452cd9><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-85452cd9>Cancelar</button><button class="flex-1 bg-burgundy text-white font-bold py-2.5 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md" data-v-85452cd9> Salvar Alterações </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85452cd9"]]);

export { admin as default };
