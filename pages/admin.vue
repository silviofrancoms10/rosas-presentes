<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// ── Auth ──────────────────────────────────────────────────────────────────────
const token = ref('')
const password = ref('')
const loginError = ref('')
const isLoggingIn = ref(false)

async function login() {
  isLoggingIn.value = true
  loginError.value = ''
  try {
    const res = await $fetch<{ token: string }>('/api/admin/login', {
      method: 'POST',
      body: { password: password.value },
    })
    token.value = res.token
    localStorage.setItem('admin_token', res.token)
    await loadProducts()
  } catch {
    loginError.value = 'Senha incorreta. Tente novamente.'
  } finally {
    isLoggingIn.value = false
  }
}

function logout() {
  token.value = ''
  localStorage.removeItem('admin_token')
  products.value = []
}

onMounted(() => {
  const saved = localStorage.getItem('admin_token')
  if (saved) {
    token.value = saved
    loadProducts()
  }
})

// ── Products ──────────────────────────────────────────────────────────────────
const products = ref<any[]>([])
const isLoading = ref(false)
const saveError = ref('')

const categoryOptions = ['buques', 'cestas', 'presentes', 'destaques']

const emptyForm = () => ({
  id: '',
  name: '',
  description: '',
  price: 0,
  oldPrice: null as number | null,
  category: 'buques',
  categories: ['buques'] as string[],
  image: '',
  images: [] as string[],
  featured: false,
  installments: '',
})

const form = ref(emptyForm())
const editingId = ref<string | null>(null)
const showForm = ref(false)
const tab = ref<'products' | 'guide'>('products')
const deleteConfirmId = ref<string | null>(null)
const successMsg = ref('')

function authHeaders() {
  return { Authorization: `Bearer ${token.value}` }
}

async function loadProducts() {
  isLoading.value = true
  try {
    products.value = await $fetch<any[]>('/api/admin/products', { headers: authHeaders() })
  } catch (e: any) {
    if (e.statusCode === 401) logout()
  } finally {
    isLoading.value = false
  }
}

function openCreate() {
  form.value = emptyForm()
  editingId.value = null
  showForm.value = true
  saveError.value = ''
}

function openEdit(p: any) {
  form.value = {
    ...p,
    oldPrice: p.oldPrice ?? null,
    images: [...(p.images ?? [])],
    categories: [...(p.categories ?? [p.category])],
  }
  editingId.value = p.id
  showForm.value = true
  saveError.value = ''
}

function cancelForm() {
  showForm.value = false
  editingId.value = null
}

function toggleCategory(cat: string) {
  const idx = form.value.categories.indexOf(cat)
  if (idx === -1) form.value.categories.push(cat)
  else form.value.categories.splice(idx, 1)
  // Sync primary category
  if (form.value.categories.length > 0 && !form.value.categories.includes(form.value.category)) {
    form.value.category = form.value.categories[0]
  }
}

function addImageUrl() {
  form.value.images.push('')
}
function removeImageUrl(idx: number) {
  form.value.images.splice(idx, 1)
}
function updateImageUrl(idx: number, val: string) {
  form.value.images[idx] = val
}

// ── Upload ────────────────────────────────────────────────────────────────────
const uploadingIdx = ref<number | null>(null)
const uploadError = ref('')

async function uploadImage(idx: number, file: File) {
  uploadError.value = ''
  const allowed = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowed.includes(file.type)) {
    uploadError.value = 'Apenas PNG, JPG e JPEG são permitidos.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'Arquivo muito grande (máx. 5MB).'
    return
  }
  uploadingIdx.value = idx
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: fd,
    })
    form.value.images[idx] = res.url
  } catch (e: any) {
    uploadError.value = e.data?.statusMessage ?? 'Erro ao enviar imagem.'
  } finally {
    uploadingIdx.value = null
  }
}

function onFileChange(idx: number, event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    uploadImage(idx, input.files[0])
  }
}

async function saveProduct() {
  saveError.value = ''
  const payload = {
    ...form.value,
    price: Number(form.value.price),
    oldPrice: form.value.oldPrice ? Number(form.value.oldPrice) : undefined,
    image: form.value.images[0] ?? form.value.image,
    images: form.value.images.filter(Boolean),
  }
  try {
    if (editingId.value) {
      await $fetch('/api/admin/products', { method: 'PUT', headers: authHeaders(), body: payload })
      successMsg.value = 'Produto atualizado com sucesso!'
    } else {
      if (!payload.id) { saveError.value = 'ID é obrigatório'; return }
      await $fetch('/api/admin/products', { method: 'POST', headers: authHeaders(), body: payload })
      successMsg.value = 'Produto criado com sucesso!'
    }
    showForm.value = false
    await loadProducts()
    setTimeout(() => { successMsg.value = '' }, 3500)
  } catch (e: any) {
    saveError.value = e.data?.statusMessage ?? 'Erro ao salvar produto.'
  }
}

async function deleteProduct(id: string) {
  try {
    await $fetch(`/api/admin/products?id=${id}`, { method: 'DELETE', headers: authHeaders() })
    successMsg.value = 'Produto removido com sucesso!'
    deleteConfirmId.value = null
    await loadProducts()
    setTimeout(() => { successMsg.value = '' }, 3500)
  } catch (e: any) {
    saveError.value = e.data?.statusMessage ?? 'Erro ao remover produto.'
  }
}

const featuredProducts = computed(() => products.value.filter(p => p.featured))

function formatPrice(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}
</script>

<template>
  <div class="min-h-screen bg-neutral-100 font-sans">

    <!-- ── Login Screen ───────────────────────────────────── -->
    <div v-if="!token" class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-neutral-200">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-burgundy rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-extrabold text-burgundy">Painel Admin</h1>
          <p class="text-sm text-neutral-500 mt-1">Rosas Presentes</p>
        </div>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-600 mb-1.5">Senha de Acesso</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••••••"
              class="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all"
              autocomplete="current-password"
            />
          </div>
          <p v-if="loginError" class="text-xs text-red-600 font-medium">{{ loginError }}</p>
          <button
            type="submit"
            :disabled="isLoggingIn || !password"
            class="w-full bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoggingIn ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
        <p class="text-[11px] text-center text-neutral-400 mt-6">
          Acesso restrito ao administrador da loja.
        </p>
      </div>
    </div>

    <!-- ── Admin Panel ────────────────────────────────────── -->
    <div v-else>

      <!-- Header -->
      <header class="bg-burgundy text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <h1 class="font-extrabold text-base leading-none">Painel Admin</h1>
            <p class="text-white/60 text-[11px]">Rosas Presentes</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <a href="/" target="_blank" class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Ver loja</span>
          </a>
          <button @click="logout" class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sair</span>
          </button>
        </div>
      </header>

      <!-- Success Toast -->
      <div
        v-if="successMsg"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-pulse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <span>{{ successMsg }}</span>
      </div>

      <!-- Tabs -->
      <div class="max-w-6xl mx-auto px-4 pt-6">
        <div class="flex space-x-2 mb-6">
          <button
            @click="tab = 'products'"
            :class="tab === 'products' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >Produtos</button>
          <button
            @click="tab = 'guide'"
            :class="tab === 'guide' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >Como usar</button>
        </div>

        <!-- ── Products Tab ─────────────────────────── -->
        <div v-if="tab === 'products'">

          <!-- Stats row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
              <p class="text-xs text-neutral-500 font-medium">Total produtos</p>
              <p class="text-2xl font-extrabold text-burgundy mt-0.5">{{ products.length }}</p>
            </div>
            <div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
              <p class="text-xs text-neutral-500 font-medium">Destaques (banners)</p>
              <p class="text-2xl font-extrabold text-burgundy mt-0.5">{{ featuredProducts.length }}</p>
            </div>
            <div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
              <p class="text-xs text-neutral-500 font-medium">Buquês</p>
              <p class="text-2xl font-extrabold text-burgundy mt-0.5">{{ products.filter(p=>p.category==='buques').length }}</p>
            </div>
            <div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
              <p class="text-xs text-neutral-500 font-medium">Cestas/Presentes</p>
              <p class="text-2xl font-extrabold text-burgundy mt-0.5">{{ products.filter(p=>p.category==='cestas'||p.category==='presentes').length }}</p>
            </div>
          </div>

          <!-- Action bar -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-extrabold text-lg text-neutral-800">Catálogo de Produtos</h2>
            <button
              @click="openCreate"
              class="bg-burgundy text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-2 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Novo Produto</span>
            </button>
          </div>

          <!-- Products List -->
          <div v-if="isLoading" class="text-center py-16 text-neutral-400">Carregando...</div>
          <div v-else class="space-y-3">
            <div
              v-for="p in products"
              :key="p.id"
              class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img :src="p.image" :alt="p.name" class="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-neutral-100" />
              <div class="flex-grow min-w-0">
                <div class="flex items-center space-x-2">
                  <h3 class="font-bold text-neutral-800 text-sm truncate">{{ p.name }}</h3>
                  <span v-if="p.featured" class="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full shrink-0">Banner</span>
                </div>
                <p class="text-xs text-neutral-500 truncate mt-0.5">{{ p.description }}</p>
                <div class="flex items-center space-x-3 mt-1.5">
                  <span class="text-sm font-extrabold text-burgundy">{{ formatPrice(p.price) }}</span>
                  <span v-if="p.oldPrice" class="text-xs text-neutral-400 line-through">{{ formatPrice(p.oldPrice) }}</span>
                  <span class="text-[10px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded-full capitalize">{{ p.category }}</span>
                </div>
              </div>
              <div class="flex items-center space-x-2 flex-shrink-0">
                <button
                  @click="openEdit(p)"
                  class="p-2 rounded-xl hover:bg-burgundy/5 text-neutral-500 hover:text-burgundy transition-colors"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="deleteConfirmId = p.id"
                  class="p-2 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Remover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Guide Tab ─────────────────────────────── -->
        <div v-if="tab === 'guide'" class="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-sm mb-8">
          <h2 class="font-extrabold text-lg text-burgundy border-b border-burgundy/10 pb-3">Como usar o Painel Admin</h2>
          <div class="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">📦 Adicionar Produto</h3>
              <p>Clique em <strong>"Novo Produto"</strong>. Preencha todos os campos. O <strong>ID</strong> deve ser único (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs">buque-03</code>). As imagens são URLs do caminho da imagem no servidor (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs">/images/produtos/minha-foto.jpg</code>).</p>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">✏️ Editar Produto</h3>
              <p>Clique no ícone de <strong>lápis</strong> ao lado do produto. Todos os dados são preenchidos automaticamente para edição. Salve quando finalizar.</p>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">🗑️ Remover Produto</h3>
              <p>Clique no ícone de <strong>lixeira</strong> ao lado do produto. Uma confirmação será solicitada antes de excluir permanentemente.</p>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">🖼️ Controlar Banners (Destaques)</h3>
              <p>Os banners do carrossel da página inicial são os produtos com <strong>"Destaque (Banner)"</strong> marcado. Para adicionar um produto ao banner, edite-o e ative essa opção. Para remover do banner, desative a opção.</p>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">🖼️ Adicionar Imagens</h3>
              <p>Coloque os arquivos de imagem na pasta <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs">public/images/produtos/</code> do projeto. Depois insira o caminho no campo de imagem (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs">/images/produtos/nome-do-arquivo.jpg</code>).</p>
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 class="font-bold text-amber-800 mb-1">🔐 Segurança</h3>
              <p class="text-amber-700 text-xs">A senha de acesso está definida no arquivo <code class="bg-amber-100 px-1 rounded font-mono">.env</code> na variável <code class="bg-amber-100 px-1 rounded font-mono">ADMIN_SECRET</code>. Troque para uma senha forte e nunca compartilhe. O painel só funciona no servidor — não é acessível sem a senha correta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Delete Confirm Modal ───────────────────────────── -->
    <Transition name="fade">
      <div v-if="deleteConfirmId" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4">
          <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h3 class="font-extrabold text-neutral-800 text-lg">Confirmar exclusão?</h3>
          <p class="text-sm text-neutral-500">Esta ação é <strong>irreversível</strong>. O produto será removido permanentemente do catálogo e dos banners.</p>
          <div class="flex space-x-3">
            <button @click="deleteConfirmId = null" class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm">Cancelar</button>
            <button @click="deleteProduct(deleteConfirmId!)" class="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm">Remover</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Create/Edit Modal ──────────────────────────────── -->
    <Transition name="fade">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4">
        <div class="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">
          <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <h2 class="font-extrabold text-burgundy text-base">
              {{ editingId ? 'Editar Produto' : 'Novo Produto' }}
            </h2>
            <button @click="cancelForm" class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="overflow-y-auto p-6 space-y-5 flex-grow">

            <!-- ID e Nome -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="form-label">ID único <span class="text-red-500">*</span></label>
                <input v-model="form.id" :disabled="!!editingId" type="text" placeholder="ex: buque-04" class="form-input" />
                <p v-if="!!editingId" class="text-[11px] text-neutral-400 mt-1">ID não pode ser alterado na edição</p>
              </div>
              <div>
                <label class="form-label">Nome do Produto <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" placeholder="Nome do produto" class="form-input" />
              </div>
            </div>

            <!-- Descrição -->
            <div>
              <label class="form-label">Descrição</label>
              <textarea v-model="form.description" rows="3" class="form-input resize-none" placeholder="Descreva o produto..." />
            </div>

            <!-- Preço e Preço antigo -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Preço (R$) <span class="text-red-500">*</span></label>
                <input v-model.number="form.price" type="number" min="0" step="0.01" class="form-input" placeholder="0.00" />
              </div>
              <div>
                <label class="form-label">Preço Antigo / De (opcional)</label>
                <input v-model.number="form.oldPrice" type="number" min="0" step="0.01" class="form-input" placeholder="Deixe vazio se sem promoção" />
              </div>
            </div>

            <!-- Parcelamento -->
            <div>
              <label class="form-label">Texto de Parcelamento</label>
              <input v-model="form.installments" type="text" placeholder="ex: 3x de R$ 65,30 sem juros" class="form-input" />
            </div>

            <!-- Categorias -->
            <div>
              <label class="form-label">Categorias <span class="text-red-500">*</span></label>
              <div class="flex flex-wrap gap-2 mt-1.5">
                <button
                  v-for="cat in categoryOptions"
                  :key="cat"
                  type="button"
                  @click="toggleCategory(cat)"
                  :class="form.categories.includes(cat) ? 'bg-burgundy text-white border-burgundy' : 'bg-white text-neutral-600 border-neutral-300 hover:border-burgundy'"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize"
                >
                  {{ cat }}
                </button>
              </div>
              <p class="text-[11px] text-neutral-400 mt-1.5">A primeira categoria selecionada será a principal. "destaques" aparece no carrossel de banners.</p>
            </div>

            <!-- Destaque / Banner -->
            <div class="flex items-center space-x-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <input id="featured-toggle" v-model="form.featured" type="checkbox" class="h-5 w-5 accent-burgundy cursor-pointer" />
              <label for="featured-toggle" class="cursor-pointer">
                <span class="text-sm font-bold text-amber-800 block">Destaque (Banner)</span>
                <span class="text-xs text-amber-600">Aparece no carrossel principal da página inicial</span>
              </label>
            </div>

            <!-- Imagens -->
            <div>
              <label class="form-label">Imagens do Produto</label>
              <p class="text-[11px] text-neutral-400 mb-3">A 1ª imagem é a capa. Faça upload direto (PNG, JPG, JPEG — máx. 5MB) ou cole uma URL manualmente.</p>

              <div class="space-y-3">
                <div
                  v-for="(img, idx) in form.images"
                  :key="idx"
                  class="bg-neutral-50 border border-neutral-200 rounded-2xl p-3 space-y-2"
                >
                  <!-- Preview + badge -->
                  <div class="flex items-start space-x-3">
                    <div class="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300">
                      <img
                        v-if="img"
                        :src="img"
                        class="w-full h-full object-cover"
                        :alt="`Imagem ${idx + 1}`"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <!-- Spinner de upload -->
                      <div v-if="uploadingIdx === idx" class="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <svg class="animate-spin h-6 w-6 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                      </div>
                    </div>

                    <div class="flex-grow space-y-2">
                      <div class="flex items-center space-x-1.5">
                        <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {{ idx === 0 ? 'Capa (principal)' : `Imagem ${idx + 1}` }}
                        </span>
                      </div>

                      <!-- Botão de upload -->
                      <label
                        :class="uploadingIdx === idx ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-burgundy hover:text-burgundy'"
                        class="flex items-center space-x-2 border-2 border-dashed border-neutral-300 text-neutral-500 text-xs font-semibold px-3 py-2 rounded-xl transition-colors w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span>{{ uploadingIdx === idx ? 'Enviando...' : 'Clique para fazer upload (PNG, JPG, JPEG)' }}</span>
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                          class="hidden"
                          :disabled="uploadingIdx === idx"
                          @change="onFileChange(idx, $event)"
                        />
                      </label>

                      <!-- URL manual (fallback) -->
                      <input
                        :value="img"
                        @input="updateImageUrl(idx, ($event.target as HTMLInputElement).value)"
                        type="text"
                        placeholder="Ou cole a URL manualmente: /images/produtos/foto.jpg"
                        class="form-input text-xs"
                      />
                    </div>

                    <!-- Remover -->
                    <button
                      type="button"
                      @click="removeImageUrl(idx)"
                      class="p-1.5 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1"
                      title="Remover imagem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Erro de upload -->
              <p v-if="uploadError" class="text-xs text-red-600 font-semibold mt-2 flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <span>{{ uploadError }}</span>
              </p>

              <!-- Adicionar nova imagem -->
              <button
                type="button"
                @click="addImageUrl"
                class="mt-3 text-xs text-burgundy font-semibold flex items-center space-x-1.5 hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar outra imagem</span>
              </button>
            </div>

            <p v-if="saveError" class="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">{{ saveError }}</p>
          </div>

          <div class="px-6 py-4 border-t border-neutral-100 flex space-x-3">
            <button @click="cancelForm" class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors text-sm">Cancelar</button>
            <button @click="saveProduct" class="flex-1 bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md">
              {{ editingId ? 'Salvar Alterações' : 'Criar Produto' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
