<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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
    await loadCategories()
    await loadOrders()
    await loadReports()
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
  categories.value = []
  orders.value = []
  reportsData.value = {
    statusStats: [],
    topProducts: [],
    billingDaily: [],
    billingWeekly: [],
    billingMonthly: [],
    billingYearly: []
  }
}

onMounted(() => {
  const saved = localStorage.getItem('admin_token')
  if (saved) {
    token.value = saved
    loadProducts()
    loadCategories()
    loadOrders()
    loadReports()
  }
})

// Helper headers
function authHeaders() {
  return { Authorization: `Bearer ${token.value}` }
}

// ── Orders State & Logic ──────────────────────────────────────────────────────
const orders = ref<any[]>([])
const isOrdersLoading = ref(false)

async function loadOrders() {
  isOrdersLoading.value = true
  try {
    orders.value = await $fetch<any[]>('/api/admin/orders', { headers: authHeaders() })
  } catch (e: any) {
    console.error('Erro ao carregar pedidos', e)
  } finally {
    isOrdersLoading.value = false
  }
}

async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await $fetch('/api/admin/orders', {
      method: 'PUT',
      headers: authHeaders(),
      body: { id: orderId, status: newStatus }
    })
    successMsg.value = `Status do pedido atualizado para "${newStatus.toUpperCase()}"!`
    await loadOrders()
    await loadReports() // Recarrega os dados do relatório/dashboard
    setTimeout(() => { successMsg.value = '' }, 3500)
  } catch (e: any) {
    alert(e.data?.statusMessage ?? 'Erro ao atualizar status.')
  }
}

function getShippingDeadline(createdAtStr: string) {
  // Ajusta o formato da data caso venha sem "T" do SQLite
  const normalizedStr = createdAtStr.includes('T') ? createdAtStr : createdAtStr.replace(' ', 'T')
  const createdAt = new Date(normalizedStr)
  
  // O prazo limite é criado_em + 2 dias
  const deadline = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000)
  const now = new Date()
  
  const diffTime = deadline.getTime() - now.getTime()
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
  
  const formattedDate = deadline.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  if (diffHours < 0) {
    return {
      text: `Atrasado (Limite: ${formattedDate})`,
      class: 'text-red-600 bg-red-50 border border-red-200'
    }
  } else if (diffHours <= 12) {
    return {
      text: `Urgente: Envio em até ${diffHours}h (Limite: ${formattedDate})`,
      class: 'text-amber-700 bg-amber-50 border border-amber-200 font-semibold'
    }
  } else {
    const diffDays = Math.floor(diffHours / 24)
    const remainingText = diffDays > 0 ? `${diffDays}d restantes` : `${diffHours}h restantes`
    return {
      text: `Prazo de envio: ${remainingText} (Limite: ${formattedDate})`,
      class: 'text-neutral-700 bg-neutral-50 border border-neutral-200'
    }
  }
}

// ── Reports State & Logic ─────────────────────────────────────────────────────
const reportsData = ref<any>({
  statusStats: [],
  topProducts: [],
  billingDaily: [],
  billingWeekly: [],
  billingMonthly: [],
  billingYearly: []
})
const isReportsLoading = ref(false)

const selectedPeriodType = ref<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily')
const billingYearFilter = ref<string>('Todos')
const billingMonthFilter = ref<string>('Todos')

async function loadReports() {
  isReportsLoading.value = true
  try {
    reportsData.value = await $fetch<any>('/api/admin/reports', { headers: authHeaders() })
  } catch (e: any) {
    console.error('Erro ao carregar relatórios', e)
  } finally {
    isReportsLoading.value = false
  }
}

const availableYears = computed(() => {
  const years = new Set<string>()
  reportsData.value.billingDaily.forEach((d: any) => {
    if (d.period) {
      const year = d.period.split('-')[0]
      years.add(year)
    }
  })
  return Array.from(years).sort((a, b) => b.localeCompare(a))
})

const monthsList = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' }
]

const filteredBilling = computed(() => {
  let list = []
  if (selectedPeriodType.value === 'daily') {
    list = reportsData.value.billingDaily
  } else if (selectedPeriodType.value === 'weekly') {
    list = reportsData.value.billingWeekly
  } else if (selectedPeriodType.value === 'monthly') {
    list = reportsData.value.billingMonthly
  } else {
    list = reportsData.value.billingYearly
  }

  return list.filter((item: any) => {
    if (!item.period) return true
    
    // Filter by year
    if (billingYearFilter.value !== 'Todos') {
      const year = item.period.split('-')[0]
      if (year !== billingYearFilter.value) return false
    }

    // Filter by month
    if (selectedPeriodType.value === 'daily' && billingMonthFilter.value !== 'Todos') {
      const month = item.period.split('-')[1] // 'YYYY-MM-DD' -> 'MM'
      if (month !== billingMonthFilter.value) return false
    }
    if (selectedPeriodType.value === 'monthly' && billingMonthFilter.value !== 'Todos') {
      const month = item.period.split('-')[1] // 'YYYY-MM' -> 'MM'
      if (month !== billingMonthFilter.value) return false
    }

    return true
  })
})

// ── Products ──────────────────────────────────────────────────────────────────
const products = ref<any[]>([])
const isLoading = ref(false)
const saveError = ref('')

const categoryOptions = ['buques', 'cestas', 'presentes', 'destaques']

function parsePrice(val: any): number {
  if (val === undefined || val === null || val === '') return 0
  const str = String(val).trim()
  const normalized = str.replace(',', '.')
  const num = Number(normalized)
  return isNaN(num) ? 0 : num
}

function parseOptionalPrice(val: any): number | null {
  if (val === undefined || val === null || val === '') return null
  const str = String(val).trim()
  const normalized = str.replace(',', '.')
  const num = Number(normalized)
  return isNaN(num) ? null : num
}

function detectInstallmentOption(installments: string | null | undefined): string {
  if (!installments) return ''
  const trimmed = installments.trim()
  if (trimmed.startsWith('2x de R$') && trimmed.endsWith('sem juros')) return '2'
  if (trimmed.startsWith('3x de R$') && trimmed.endsWith('sem juros')) return '3'
  return 'custom'
}

const emptyForm = () => ({
  id: '',
  name: '',
  description: '',
  price: '' as string | number,
  oldPrice: '' as string | number | null,
  category: 'buques',
  categories: ['buques'] as string[],
  image: '',
  images: [] as string[],
  featured: false,
  installments: '',
})

const form = ref(emptyForm())
const installmentOption = ref('')
const editingId = ref<string | null>(null)
const showForm = ref(false)
const tab = ref<'orders' | 'reports' | 'products' | 'categories' | 'guide'>('orders')
const deleteConfirmId = ref<string | null>(null)
const successMsg = ref('')

// ── Categories State & Logic ──────────────────────────────────────────────────
const categories = ref<any[]>([])
const isCategoriesLoading = ref(false)
const categoryForm = ref({
  id: '',
  name: '',
  image: ''
})
const showCategoryForm = ref(false)
const isUploadingCategory = ref(false)
const categoryUploadError = ref('')

async function loadCategories() {
  isCategoriesLoading.value = true
  try {
    categories.value = await $fetch<any[]>('/api/categories')
  } catch (e: any) {
    console.error('Erro ao carregar categorias', e)
  } finally {
    isCategoriesLoading.value = false
  }
}

function openEditCategory(cat: any) {
  categoryForm.value = {
    id: cat.id,
    name: cat.name,
    image: cat.image
  }
  categoryUploadError.value = ''
  showCategoryForm.value = true
}

async function uploadCategoryImg(file: File) {
  categoryUploadError.value = ''
  const allowed = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowed.includes(file.type)) {
    categoryUploadError.value = 'Apenas PNG, JPG e JPEG são permitidos.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    categoryUploadError.value = 'Arquivo muito grande (máx. 5MB).'
    return
  }
  isUploadingCategory.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('categoryName', categoryForm.value.name)
    fd.append('oldImageUrl', categoryForm.value.image)

    const res = await $fetch<{ url: string }>('/api/admin/categories/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: fd,
    })
    categoryForm.value.image = res.url
  } catch (e: any) {
    categoryUploadError.value = e.data?.statusMessage ?? 'Erro ao enviar imagem da categoria.'
  } finally {
    isUploadingCategory.value = false
  }
}

async function onCategoryFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = await compressImage(input.files[0])
    uploadCategoryImg(file)
  }
}

async function saveCategory() {
  categoryUploadError.value = ''
  try {
    await $fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: categoryForm.value
    })
    showCategoryForm.value = false
    successMsg.value = 'Categoria atualizada com sucesso!'
    await loadCategories()
    setTimeout(() => { successMsg.value = '' }, 3500)
  } catch (e: any) {
    categoryUploadError.value = e.data?.statusMessage ?? 'Erro ao salvar categoria.'
  }
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
  installmentOption.value = ''
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
  installmentOption.value = detectInstallmentOption(p.installments)
  editingId.value = p.id
  showForm.value = true
  saveError.value = ''
}

watch([() => form.value.price, installmentOption], () => {
  if (installmentOption.value === '') {
    form.value.installments = ''
  } else if (installmentOption.value === '2') {
    const numericPrice = parsePrice(form.value.price)
    const val = numericPrice / 2
    form.value.installments = `2x de R$ ${val.toFixed(2).replace('.', ',')} sem juros`
  } else if (installmentOption.value === '3') {
    const numericPrice = parsePrice(form.value.price)
    const val = numericPrice / 3
    form.value.installments = `3x de R$ ${val.toFixed(2).replace('.', ',')} sem juros`
  }
})

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

// Helper para compressão de imagens via Canvas no cliente (Alvo: ~1MB)
function compressImage(file: File, maxWidth = 2560, quality = 0.9): Promise<File> {
  return new Promise((resolve) => {
    // Se o arquivo original já for menor que 1.1MB, envia ele direto para manter 100% da qualidade
    if (file.size <= 1.1 * 1024 * 1024) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Redimensiona se for maior que a largura máxima (2K) mantendo a proporção
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(file)
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = () => resolve(file)
    }
    reader.onerror = () => resolve(file)
  })
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

async function onFileChange(idx: number, event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = await compressImage(input.files[0])
    uploadImage(idx, file)
  }
}

async function saveProduct() {
  saveError.value = ''
  
  const parsedP = parsePrice(form.value.price)
  const parsedOldP = parseOptionalPrice(form.value.oldPrice)

  // Atualiza no formulário para refletir com ponto (.) na interface
  form.value.price = parsedP
  form.value.oldPrice = parsedOldP

  const payload = {
    ...form.value,
    price: parsedP,
    oldPrice: parsedOldP !== null ? parsedOldP : undefined,
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
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            @click="tab = 'orders'"
            :class="tab === 'orders' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >Pedidos</button>
          <button
            @click="tab = 'reports'"
            :class="tab === 'reports' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >Relatórios</button>
          <button
            @click="tab = 'products'"
            :class="tab === 'products' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >Produtos</button>
          <button
            @click="tab = 'categories'"
            :class="tab === 'categories' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >Categorias</button>
          <button
            @click="tab = 'guide'"
            :class="tab === 'guide' ? 'bg-burgundy text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50'"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >Como usar</button>
        </div>

        <!-- ── Orders Tab ───────────────────────────── -->
        <div v-if="tab === 'orders'">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-extrabold text-lg text-neutral-800">Gerenciamento de Pedidos</h2>
            <button
              @click="loadOrders"
              class="bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2050/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.248 8H18" />
              </svg>
              <span>Atualizar</span>
            </button>
          </div>

          <div v-if="isOrdersLoading" class="text-center py-16 text-neutral-400">Carregando pedidos...</div>
          <div v-else-if="orders.length === 0" class="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500">
            Nenhum pedido encontrado.
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="order in orders"
              :key="order.id"
              class="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Order Header -->
              <div class="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-base text-burgundy font-mono">{{ order.id }}</span>
                    <span
                      class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full"
                      :class="{
                        'bg-blue-100 text-blue-700': order.status === 'novo',
                        'bg-amber-100 text-amber-700': order.status === 'enviado',
                        'bg-red-100 text-red-700': order.status === 'cancelado',
                        'bg-green-100 text-green-700': order.status === 'concluido'
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                  <p class="text-xs text-neutral-505">
                    Realizado em: {{ new Date(order.created_at.replace(' ', 'T')).toLocaleString('pt-BR') }}
                  </p>
                </div>

                <!-- Shipping Deadline (only if status is 'novo') -->
                <div 
                  v-if="order.status === 'novo'"
                  class="px-3.5 py-1.5 rounded-xl text-xs border font-medium flex items-center gap-1.5 animate-pulse"
                  :class="getShippingDeadline(order.created_at).class"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ getShippingDeadline(order.created_at).text }}</span>
                </div>

                <!-- Status Action Control -->
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-xs font-semibold text-neutral-500">Alterar Status:</span>
                  <div class="inline-flex rounded-xl border border-neutral-200 bg-white p-1 shadow-sm">
                    <button
                      v-for="s in ['novo', 'enviado', 'concluido', 'cancelado']"
                      :key="s"
                      @click="updateOrderStatus(order.id, s)"
                      :class="order.status === s ? 'bg-burgundy text-white font-bold' : 'text-neutral-650 hover:bg-neutral-100'"
                      class="px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer"
                    >
                      {{ s === 'novo' ? 'Novo' : s === 'enviado' ? 'Enviado' : s === 'concluido' ? 'Concluído' : 'Cancelado' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Order Body (Grid) -->
              <div class="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                <!-- Customer & Delivery Details (7 cols) -->
                <div class="md:col-span-7 space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Comprador</h4>
                      <p class="text-sm font-bold text-neutral-850">{{ order.customer_name }}</p>
                      <p class="text-xs text-neutral-500 mt-1">
                        <a :href="`https://wa.me/55${order.customer_phone.replace(/\D/g, '')}`" target="_blank" class="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50 rounded-lg px-2.5 py-1 inline-flex items-center gap-1.5 font-semibold transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.507.003 9.974-4.463 9.977-9.977.002-2.671-1.037-5.183-2.927-7.073-1.89-1.89-4.4-2.93-7.072-2.931-5.51 0-9.98 4.47-9.985 9.983-.001 1.714.47 3.328 1.393 4.723l-.986 3.6 3.69-.968zm11.415-4.83c-.3-.149-1.772-.874-2.046-.973-.274-.1-.474-.149-.673.15-.198.298-.77.973-.943 1.171-.173.198-.347.223-.647.074-.3-.15-1.267-.467-2.414-1.493-.892-.796-1.494-1.78-1.669-2.079-.173-.3-.018-.462.13-.61.134-.133.3-.347.449-.52.149-.173.198-.298.298-.497.1-.2.05-.373-.025-.52-.075-.15-.673-1.62-.922-2.22-.242-.58-.488-.5-.673-.51-.173-.01-.373-.01-.572-.01-.2 0-.52.075-.793.372-.272.298-1.04 1.018-1.04 2.482 0 1.464 1.066 2.879 1.214 3.078.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.772-.724 2.022-1.424.249-.699.249-1.295.173-1.424-.075-.128-.273-.203-.573-.352z"/></svg>
                          <span>WhatsApp</span>
                        </a>
                      </p>
                    </div>
                    <div>
                      <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Destinatário</h4>
                      <p class="text-sm font-bold text-neutral-850">{{ order.recipient_name }}</p>
                      <p class="text-xs text-neutral-600 font-medium bg-neutral-100 rounded-lg px-2.5 py-1 mt-1.5 inline-block">
                        📅 {{ order.delivery_date }} às {{ order.delivery_time || 'Qualquer horário' }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Endereço de Entrega</h4>
                    <p class="text-xs text-neutral-700 bg-neutral-50 border border-neutral-200/50 rounded-xl p-3">
                      {{ order.delivery_address }}
                    </p>
                  </div>

                  <div v-if="order.card_message">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Mensagem do Cartão</h4>
                    <div class="text-xs text-burgundy italic bg-burgundy/5 border border-burgundy/10 rounded-xl p-3 relative font-medium">
                      "{{ order.card_message }}"
                    </div>
                  </div>
                </div>

                <!-- Order Items & Summary (5 cols) -->
                <div class="md:col-span-5 bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex flex-col justify-between">
                  <div class="space-y-3">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-250 pb-1.5">Itens do Pedido</h4>
                    <div class="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                      <div
                        v-for="item in order.items"
                        :key="item.id"
                        class="flex justify-between items-start text-xs"
                      >
                        <div class="min-w-0 flex-grow pr-2">
                          <p class="font-bold text-neutral-800 truncate text-[11px]">{{ item.product_name }}</p>
                          <p class="text-[9px] text-neutral-500 mt-0.5">{{ item.quantity }}x de {{ formatPrice(item.price) }}</p>
                        </div>
                        <span class="font-extrabold text-neutral-800 flex-shrink-0 text-[11px]">
                          {{ formatPrice(item.price * item.quantity) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-neutral-200 pt-3 mt-4 space-y-1.5">
                    <div class="flex justify-between text-[11px] text-neutral-550 font-medium">
                      <span>Pagamento:</span>
                      <span class="uppercase font-bold text-neutral-700">{{ order.payment_method }}</span>
                    </div>
                    <div v-if="order.payment_url" class="flex justify-between text-[11px] text-neutral-550 font-medium">
                      <span>Checkout InfinitePay:</span>
                      <a :href="order.payment_url" target="_blank" class="text-burgundy hover:underline font-bold">
                        Link de Pagamento 🔗
                      </a>
                    </div>
                    <div class="flex justify-between text-xs font-black text-burgundy border-t border-dashed border-neutral-300 pt-2">
                      <span>Total Pago:</span>
                      <span>{{ formatPrice(order.total_price) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Reports Tab ──────────────────────────── -->
        <div v-if="tab === 'reports'">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-extrabold text-lg text-neutral-800">Relatórios & Estatísticas</h2>
            <button
              @click="loadReports"
              class="bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2050/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.248 8H18" />
              </svg>
              <span>Atualizar dados</span>
            </button>
          </div>

          <div v-if="isReportsLoading" class="text-center py-16 text-neutral-400">Carregando estatísticas...</div>
          <div v-else class="space-y-6">
            
            <!-- Dashboard Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Total Revenue -->
              <div class="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
                <p class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Faturamento Líquido</p>
                <p class="text-lg font-black text-green-600 mt-1">
                  {{ formatPrice(reportsData.billingYearly.reduce((acc, curr) => acc + curr.revenue, 0)) }}
                </p>
                <p class="text-[9px] text-neutral-400 mt-1 leading-tight">Exclui pedidos cancelados</p>
              </div>

              <!-- Total Orders -->
              <div class="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
                <p class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Total de Pedidos</p>
                <p class="text-lg font-black text-burgundy mt-1">
                  {{ reportsData.statusStats.reduce((acc, curr) => acc + curr.count, 0) }}
                </p>
                <p class="text-[9px] text-neutral-400 mt-1 leading-tight">Pedidos criados na loja</p>
              </div>

              <!-- Completed Orders -->
              <div class="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
                <p class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Pedidos Concluídos</p>
                <p class="text-lg font-black text-neutral-800 mt-1">
                  {{ reportsData.statusStats.find(s => s.status === 'concluido')?.count || 0 }}
                </p>
                <p class="text-[9px] text-neutral-400 mt-1 leading-tight">Entregas bem-sucedidas</p>
              </div>

              <!-- Pending / New Orders -->
              <div class="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
                <p class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Pendentes de Envio</p>
                <p class="text-lg font-black text-amber-600 mt-1">
                  {{ 
                    (reportsData.statusStats.find(s => s.status === 'novo')?.count || 0) + 
                    (reportsData.statusStats.find(s => s.status === 'enviado')?.count || 0) 
                  }}
                </p>
                <p class="text-[9px] text-neutral-400 mt-1 leading-tight">Aguardando processamento</p>
              </div>
            </div>

            <!-- Two-column Charts/Breakdowns Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- Left Column: Faturamento por Período (7 cols) -->
              <div class="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 space-y-5 shadow-sm">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-100 pb-3">
                  <div>
                    <h3 class="font-extrabold text-sm text-neutral-800 uppercase tracking-wide">Faturamento Histórico</h3>
                    <p class="text-xs text-neutral-400 mt-0.5">Visão de faturamento por períodos</p>
                  </div>
                  
                  <!-- Period select buttons -->
                  <div class="inline-flex rounded-xl bg-neutral-100 p-1 border border-neutral-200 text-xs">
                    <button
                      v-for="p in [
                        { val: 'daily', lbl: 'Dia' },
                        { val: 'weekly', lbl: 'Semana' },
                        { val: 'monthly', lbl: 'Mês' },
                        { val: 'yearly', lbl: 'Ano' }
                      ]"
                      :key="p.val"
                      @click="selectedPeriodType = p.val; billingYearFilter = 'Todos'; billingMonthFilter = 'Todos'"
                      :class="selectedPeriodType === p.val ? 'bg-burgundy text-white font-bold' : 'text-neutral-600 hover:bg-neutral-200/50'"
                      class="px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer"
                    >
                      {{ p.lbl }}
                    </button>
                  </div>
                </div>

                <!-- Filters for years and months -->
                <div class="grid grid-cols-2 gap-3 bg-neutral-50 border border-neutral-200/60 rounded-2xl p-3">
                  <div>
                    <label class="block text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Filtrar por Ano</label>
                    <select v-model="billingYearFilter" class="w-full bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-burgundy">
                      <option value="Todos">Todos os Anos</option>
                      <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Filtrar por Mês</label>
                    <select 
                      v-model="billingMonthFilter" 
                      :disabled="selectedPeriodType === 'yearly' || selectedPeriodType === 'weekly'" 
                      class="w-full bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-burgundy disabled:opacity-50 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                    >
                      <option value="Todos">Todos os Meses</option>
                      <option v-for="m in monthsList" :key="m.value" :value="m.value">{{ m.label }}</option>
                    </select>
                  </div>
                </div>

                <!-- Billing History List/Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="border-b border-neutral-200 text-neutral-400 uppercase font-bold tracking-wider text-[10px]">
                        <th class="pb-3 font-semibold">Período</th>
                        <th class="pb-3 text-center font-semibold">Qtd Pedidos</th>
                        <th class="pb-3 text-right font-semibold">Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="filteredBilling.length === 0">
                        <td colspan="3" class="py-8 text-center text-neutral-405 italic">Nenhum registro para os filtros selecionados.</td>
                      </tr>
                      <tr
                        v-for="row in filteredBilling"
                        :key="row.period"
                        class="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
                      >
                        <td class="py-2.5 font-bold text-neutral-700">
                          {{ 
                            selectedPeriodType === 'monthly' 
                              ? row.period.split('-')[1] + '/' + row.period.split('-')[0]
                              : selectedPeriodType === 'daily'
                                ? new Date(row.period + 'T00:00:00').toLocaleDateString('pt-BR')
                                : row.period 
                          }}
                        </td>
                        <td class="py-2.5 text-center text-neutral-600 font-semibold">{{ row.count }}</td>
                        <td class="py-2.5 text-right font-black text-green-600">{{ formatPrice(row.revenue) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Right Column: Top Products List (5 cols) -->
              <div class="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 p-6 space-y-5 shadow-sm">
                <div>
                  <h3 class="font-extrabold text-sm text-neutral-850 uppercase tracking-wide">Produtos Mais Pedidos</h3>
                  <p class="text-xs text-neutral-450 mt-0.5">Top 10 produtos mais pedidos no sistema</p>
                </div>

                <div v-if="reportsData.topProducts.length === 0" class="text-center py-8 text-neutral-405 italic text-xs">
                  Nenhum produto pedido ainda.
                </div>
                <div v-else class="space-y-3.5">
                  <div
                    v-for="(product, idx) in reportsData.topProducts"
                    :key="product.product_id"
                    class="space-y-1.5"
                  >
                    <div class="flex justify-between items-center text-xs">
                      <div class="flex items-center space-x-2 min-w-0">
                        <span class="font-bold text-[10px] text-neutral-400 w-4">{{ idx + 1 }}</span>
                        <span class="font-bold text-neutral-800 truncate text-[11px]">{{ product.product_name }}</span>
                      </div>
                      <div class="flex items-center space-x-2 shrink-0">
                        <span class="text-[9px] bg-burgundy/5 text-burgundy font-bold px-2 py-0.5 rounded-full">
                          {{ product.total_qty }} un.
                        </span>
                        <span class="font-semibold text-neutral-500 text-[11px]">
                          {{ formatPrice(product.revenue) }}
                        </span>
                      </div>
                    </div>
                    <!-- Custom progress bar -->
                    <div class="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        class="bg-burgundy h-full rounded-full transition-all duration-500"
                        :style="{ 
                          width: `${(product.total_qty / reportsData.topProducts[0].total_qty) * 100}%` 
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
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

        <!-- ── Categories Tab ─────────────────────────── -->
        <div v-if="tab === 'categories'">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-extrabold text-lg text-neutral-800">Categorias da Loja</h2>
          </div>

          <div v-if="isCategoriesLoading" class="text-center py-16 text-neutral-400">Carregando categorias...</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex items-center space-x-2">
                  <h3 class="font-bold text-neutral-800 text-sm truncate">{{ cat.name }}</h3>
                </div>
                <p class="text-[11px] text-neutral-400 font-mono mt-0.5">ID: {{ cat.id }}</p>
              </div>
              <div class="flex-shrink-0">
                <button
                  @click="openEditCategory(cat)"
                  class="bg-burgundy text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-1 shadow-sm cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Editar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Guide Tab ─────────────────────────────── -->
        <div v-if="tab === 'guide'" class="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-sm mb-8">
          <h2 class="font-extrabold text-lg text-burgundy border-b border-burgundy/10 pb-3">Como usar o Painel Admin</h2>
          <div class="space-y-6 text-sm text-neutral-700 leading-relaxed">
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">📦 Gerenciamento de Produtos</h3>
              <p class="mb-2">Você pode listar, adicionar, editar e excluir produtos do catálogo. Os dados são armazenados diretamente no banco de dados <strong>Cloudflare D1</strong>.</p>
              <ul class="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Novo Produto:</strong> Clique em "Novo Produto", insira um ID único (ex: <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono">buque-rosas-premium</code>) que não poderá ser alterado depois.</li>
                <li><strong>Preços:</strong> Preencha o preço atual e, opcionalmente, o preço antigo (para exibir descontos e valor riscado).</li>
                <li><strong>Banners (Destaques):</strong> Ative a opção "Destaque (Banner)" para exibir o produto no carrossel rotativo da página inicial.</li>
                <li><strong>Associação de Categorias:</strong> Vincule o produto a uma ou mais categorias no formulário.</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">🏷️ Edição de Categorias</h3>
              <p>Na aba <strong>Categorias</strong>, você pode atualizar o nome de exibição e a imagem de capa de cada categoria cadastrada. Quando você altera a imagem de uma categoria, o sistema remove automaticamente a imagem antiga do Cloudflare R2 para liberar espaço.</p>
            </div>
            <div>
              <h3 class="font-bold text-neutral-800 mb-1">🖼️ Upload de Imagens (Cloudflare R2)</h3>
              <p class="mb-2">Não é necessário adicionar imagens manualmente no código do projeto! O painel possui upload integrado conectado diretamente ao storage do <strong>Cloudflare R2</strong>.</p>
              <ul class="list-disc pl-5 space-y-1 text-xs">
                <li>Formatos suportados: <strong>PNG, JPG e JPEG</strong> de até 5MB.</li>
                <li><strong>Compressão Automática:</strong> Se você enviar uma imagem muito pesada (maior que 1.1MB), o painel reduzirá suas dimensões (máximo 2560px de largura) e fará a compressão no seu navegador antes do envio. Isso melhora a velocidade de carregamento do site.</li>
                <li><strong>Caminho Manual (Fallback):</strong> Caso queira usar um arquivo local da aplicação, você ainda pode digitar o caminho manual (ex: <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono">/images/produtos/nome.webp</code>).</li>
              </ul>
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 class="font-bold text-amber-800 mb-1">🔐 Segurança e Deploy</h3>
              <p class="text-amber-700 text-xs mb-2">O acesso ao painel admin requer autenticação via token Bearer. A senha é configurada na variável de ambiente <code class="bg-amber-100 px-1 rounded font-mono">ADMIN_SECRET</code>.</p>
              <p class="text-amber-700 text-xs">Certifique-se de configurar as seguintes variáveis no seu ambiente de produção (Cloudflare Pages/Workers) ou no seu arquivo local <code class="bg-amber-100 px-1 rounded font-mono">.env</code>:</p>
              <ul class="list-disc pl-5 mt-1 text-[11px] text-amber-700 space-y-0.5 font-mono">
                <li>ADMIN_SECRET: Senha de acesso ao painel admin.</li>
                <li>R2_PUBLIC_URL: URL pública do bucket R2 (ex: https://pub-xxx.r2.dev).</li>
                <li>Bindings ativos: "DB" (Cloudflare D1) e "BUCKET" (Cloudflare R2).</li>
              </ul>
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
                <input v-model="form.price" type="text" class="form-input" placeholder="Ex: 150,50 ou 150.50" />
              </div>
              <div>
                <label class="form-label">Preço Antigo / De (opcional)</label>
                <input v-model="form.oldPrice" type="text" class="form-input" placeholder="Ex: 190,00" />
              </div>
            </div>

            <!-- Parcelamento -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Opção de Parcelamento</label>
                <select v-model="installmentOption" class="form-input">
                  <option value="">Sem parcelamento</option>
                  <option value="2">Calcular em 2x sem juros</option>
                  <option value="3">Calcular em 3x sem juros</option>
                  <option value="custom">Texto personalizado</option>
                </select>
              </div>
              <div>
                <label class="form-label">Texto de Parcelamento</label>
                <input
                  v-model="form.installments"
                  :disabled="installmentOption !== 'custom'"
                  type="text"
                  placeholder="Calculado automaticamente..."
                  class="form-input disabled:bg-neutral-100 disabled:cursor-not-allowed"
                />
              </div>
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

    <!-- ── Category Edit Modal ───────────────────────────── -->
    <Transition name="fade">
      <div v-if="showCategoryForm" class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4">
        <div class="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
          <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <h2 class="font-extrabold text-burgundy text-base">Editar Categoria</h2>
            <button @click="showCategoryForm = false" class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-5 overflow-y-auto">
            <div>
              <label class="form-label">ID da Categoria</label>
              <input v-model="categoryForm.id" disabled type="text" class="form-input bg-neutral-100 cursor-not-allowed" />
            </div>

            <div>
              <label class="form-label">Nome da Categoria <span class="text-red-500">*</span></label>
              <input v-model="categoryForm.name" type="text" placeholder="Ex: Buquês Especiais" class="form-input" />
            </div>

            <div>
              <label class="form-label">Imagem da Categoria</label>
              <div class="flex items-center space-x-3 bg-neutral-50 border border-neutral-200 rounded-2xl p-3">
                <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300">
                  <img v-if="categoryForm.image" :src="categoryForm.image" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <!-- Spinner de upload -->
                  <div v-if="isUploadingCategory" class="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <svg class="animate-spin h-5 w-5 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                  </div>
                </div>

                <div class="flex-grow space-y-2">
                  <label class="cursor-pointer flex items-center justify-center space-x-1.5 border border-dashed border-neutral-300 text-neutral-600 text-xs font-semibold px-3 py-2 rounded-xl hover:border-burgundy hover:text-burgundy transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Alterar Imagem</span>
                    <input type="file" accept=".png,.jpg,.jpeg" class="hidden" @change="onCategoryFileChange" />
                  </label>
                  <input v-model="categoryForm.image" type="text" placeholder="URL da Imagem" class="form-input text-xs" />
                </div>
              </div>
            </div>

            <p v-if="categoryUploadError" class="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {{ categoryUploadError }}
            </p>
          </div>

          <div class="px-6 py-4 border-t border-neutral-100 flex space-x-3">
            <button @click="showCategoryForm = false" class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm">Cancelar</button>
            <button @click="saveCategory" class="flex-1 bg-burgundy text-white font-bold py-2.5 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md">
              Salvar Alterações
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
