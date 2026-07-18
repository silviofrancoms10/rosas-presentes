<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCartStore } from '~/stores/cartStore'
import type { Product } from '~/types/product'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// Fetch products dynamically from Nuxt API
const { data: apiProducts } = await useFetch<Product[]>('/api/products')

// State
const products = ref<Product[]>(apiProducts.value || [])
const selectedCategory = ref<string>('todos')
const activeSlide = ref<number>(0)
const selectedProduct = ref<Product | null>(null)
const isCartOpen = ref<boolean>(false)

// Paginação
const currentPage = ref(1)
const itemsPerPage = 12
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  // Rola a tela de volta para o topo da lista de produtos suavemente
  window.scrollTo({ top: 380, behavior: 'smooth' })
}

// Carousel Auto Scroll Timer
let carouselTimer: any = null

const featuredProducts = computed(() => {
  return products.value.filter((p) => p.featured)
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'todos') {
    return products.value
  }
  return products.value.filter((p) => {
    const cats = p.categories || (p.category ? [p.category] : [])
    return cats.includes(selectedCategory.value)
  })
})

// Sync Route Query with category filter
watch(
  () => route.query.category,
  (newCat) => {
    if (newCat) {
      selectedCategory.value = String(newCat)
    } else {
      selectedCategory.value = 'todos'
    }
    currentPage.value = 1 // Reseta para a primeira página ao trocar de categoria
  },
  { immediate: true },
)

const { data: apiCategories } = await useFetch<any[]>('/api/categories')
const categories = ref<any[]>(apiCategories.value || [])

// Navigation / Methods
function nextSlide() {
  if (featuredProducts.value.length === 0) return
  activeSlide.value = (activeSlide.value + 1) % featuredProducts.value.length
}

function prevSlide() {
  if (featuredProducts.value.length === 0) return
  activeSlide.value =
    (activeSlide.value - 1 + featuredProducts.value.length) % featuredProducts.value.length
}

function setSlide(index: number) {
  activeSlide.value = index
  resetCarouselTimer()
}

function startCarouselTimer() {
  carouselTimer = setInterval(nextSlide, 5000) // scroll every 5s
}

function stopCarouselTimer() {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
}

function resetCarouselTimer() {
  stopCarouselTimer()
  startCarouselTimer()
}

function selectCategory(categoryId: string) {
  router.push({ path: '/', query: { category: categoryId } })
}

const carouselTouchStartX = ref(0)
const carouselTouchEndX = ref(0)

function handleCarouselTouchStart(event: TouchEvent) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    if (touch) {
      carouselTouchStartX.value = touch.screenX
    }
  }
}

function handleCarouselTouchEnd(event: TouchEvent) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    if (touch) {
      carouselTouchEndX.value = touch.screenX
      handleCarouselSwipeGesture()
    }
  }
}

function handleCarouselSwipeGesture() {
  const swipeThreshold = 40
  const diff = carouselTouchEndX.value - carouselTouchStartX.value

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
    resetCarouselTimer()
  }
}

function openProductDetail(product: Product) {
  selectedProduct.value = product
}

function closeProductDetail() {
  selectedProduct.value = null
}

function addProductToCart(product: Product) {
  cartStore.addToCart(product)
  closeProductDetail()
  // Briefly open cart to show it was added
  isCartOpen.value = true
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

// Helper to get first image
function getFirstImage(product: Product): string {
  if (product.images && product.images.length > 0) {
    return product.images[0] || product.image
  }
  return product.image
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function goToCheckout() {
  isCartOpen.value = false
  router.push('/checkout')
}

// Lifecycle hooks
onMounted(() => {
  startCarouselTimer()
})

onUnmounted(() => {
  stopCarouselTimer()
})
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Reusable Header Component with Desktop Menu Support -->
    <Header @toggle-cart="toggleCart" />

    <!-- Full-Width Hero Carousel Section -->
    <section v-if="featuredProducts.length > 0" id="destaques-section" class="relative w-full">
      <div
        class="carousel-container-full"
        @touchstart="handleCarouselTouchStart"
        @touchend="handleCarouselTouchEnd"
      >
        <div
          v-for="(product, index) in featuredProducts"
          :key="product.id"
          class="carousel-slide"
          :class="index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <!-- Overlay and Info -->
          <div class="carousel-overlay"></div>
          <img
            :src="getFirstImage(product)"
            :alt="product.name"
            class="absolute inset-0 w-full h-full object-cover"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
          />

          <div class="absolute inset-0 z-20 flex items-end pb-9 pt-6 px-6 md:p-12 text-white">
            <div class="max-w-6xl mx-auto w-full px-4 md:px-0">
              <span
                class="text-xs font-bold uppercase tracking-wider text-crimson bg-white px-3 py-1 rounded-full w-max mb-2 shadow-sm"
              >
                Destaque Sazonal
              </span>
              <h2
                class="text-2xl md:text-4xl font-extrabold line-clamp-2 leading-tight max-w-2xl text-white"
              >
                {{ product.name }}
              </h2>
              <p
                class="text-sm md:text-base text-white/90 line-clamp-2 mt-1.5 mb-4 max-w-xl leading-relaxed"
              >
                {{ product.description }}
              </p>
              <div class="flex items-center space-x-4">
                <span class="text-xl font-bold">{{ formatPrice(product.price) }}</span>
                <button class="btn-primary" @click="addProductToCart(product)">Adicionar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Controls -->
        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90"
          @click="prevSlide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90"
          @click="nextSlide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Dots -->
        <div class="carousel-dots">
          <span
            v-for="(_, index) in featuredProducts"
            :key="index"
            class="carousel-dot"
            :class="{ 'carousel-dot-active': index === activeSlide }"
            @click="setSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Main Content Container -->
    <main class="max-w-6xl mx-auto px-4 pt-8 space-y-8 flex-grow min-w-0 w-full">
      <!-- Category Filter Section (Rectangle Cards with Double Height) -->
      <section class="space-y-3 max-w-full overflow-hidden">
        <h3 class="text-lg font-bold text-burgundy tracking-tight">Categorias</h3>
        <div class="flex w-full gap-3 md:gap-4 pb-4 overflow-x-auto scrollbar-none">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="relative rounded-2xl overflow-hidden w-[130px] shrink-0 h-20 md:flex-1 md:w-auto md:h-24 cursor-pointer select-none transition-all duration-300 ease-in-out border-2 shadow-sm"
            :class="
              selectedCategory === cat.id
                ? 'border-burgundy scale-105 shadow-md -translate-y-0.5'
                : 'border-transparent opacity-85 hover:opacity-100 hover:scale-[1.02]'
            "
            @click="selectCategory(cat.id)"
          >
            <!-- Background Image -->
            <img
              :src="cat.image"
              :alt="cat.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none"
              loading="lazy"
            />
            <!-- Dark Overlay with Bold Text -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-colors duration-300 p-2 text-center"
              :class="selectedCategory === cat.id ? 'bg-[#780000]/55' : 'bg-black/45'"
            >
              <span
                class="font-bold text-xs md:text-sm tracking-wide uppercase text-white shadow-sm"
                >{{ cat.name }}</span
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Product List (Vitrine) Section -->
      <section class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-burgundy tracking-tight">
            {{
              categories
                .find((c) => c.id === selectedCategory)
                ?.name.split(' ')
                .slice(1)
                .join(' ')
            }}
          </h3>
          <span class="text-xs text-burgundy/60 font-medium">
            {{ filteredProducts.length }} itens encontrados
          </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            @click="openProductDetail"
            @add-to-cart="addProductToCart"
          />
        </div>

        <!-- Controles de Paginação -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-1.5 mt-8 py-4">
          <button
            class="px-3 py-1.5 rounded-xl border border-burgundy/10 text-burgundy font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-all cursor-pointer"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Anterior
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="w-9 h-9 rounded-xl border text-xs font-bold transition-all cursor-pointer"
            :class="
              currentPage === page
                ? 'bg-burgundy text-white border-burgundy shadow-md'
                : 'border-burgundy/10 text-burgundy hover:bg-neutral-100'
            "
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            class="px-3 py-1.5 rounded-xl border border-burgundy/10 text-burgundy font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-all cursor-pointer"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Próxima
          </button>
        </div>
      </section>
    </main>

    <!-- Site Footer -->
    <Footer />

    <!-- Product Detail Bottom Sheet / Modal -->
    <ProductDetailModal
      :product="selectedProduct"
      :categories="categories"
      @close="closeProductDetail"
      @add-to-cart="addProductToCart"
    />

    <!-- Cart Drawer (Slide out panel) -->
    <CartDrawer v-model:isOpen="isCartOpen" />

    <!-- Mobile Navigation Bar -->
    <MobileNavBar @toggle-cart="toggleCart" />

    <!-- Floating WhatsApp button (desktop) -->
    <a
      href="https://wa.me/5567981178782?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!"
      target="_blank"
      class="hidden md:flex fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 items-center justify-center"
      title="Fale conosco no WhatsApp"
    >
      <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
