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
const activeImageIndex = ref<number>(0)
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



const touchStartX = ref(0)
const touchEndX = ref(0)

function handleTouchStart(event: TouchEvent) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    if (touch) {
      touchStartX.value = touch.screenX
    }
  }
}

function handleTouchEnd(event: TouchEvent) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    if (touch) {
      touchEndX.value = touch.screenX
      handleSwipeGesture()
    }
  }
}

function handleSwipeGesture() {
  const swipeThreshold = 40
  const diff = touchEndX.value - touchStartX.value

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
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


function nextImage() {
  if (!selectedProduct.value || !selectedProduct.value.images) return
  const len = selectedProduct.value.images.length
  if (len === 0) return
  activeImageIndex.value = (activeImageIndex.value + 1) % len
}

function prevImage() {
  if (!selectedProduct.value || !selectedProduct.value.images) return
  const len = selectedProduct.value.images.length
  if (len === 0) return
  activeImageIndex.value = (activeImageIndex.value - 1 + len) % len
}

function openProductDetail(product: Product) {
  selectedProduct.value = product
  activeImageIndex.value = 0
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
            :class="selectedCategory === cat.id ? 'border-burgundy scale-105 shadow-md -translate-y-0.5' : 'border-transparent opacity-85 hover:opacity-100 hover:scale-[1.02]'"
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
            {{ categories.find((c) => c.id === selectedCategory)?.name.split(' ').slice(1).join(' ') }}
          </h3>
          <span class="text-xs text-burgundy/60 font-medium">
            {{ filteredProducts.length }} itens encontrados
          </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="product-card-glass group cursor-pointer"
            @click="openProductDetail(product)"
          >
            <!-- Discount Badge if exists -->
            <div v-if="product.oldPrice" class="absolute top-2 left-2 z-10">
              <span class="badge-discount">Oferta</span>
            </div>

            <!-- Image Wrap -->
            <div class="aspect-[9/16] w-full rounded-xl overflow-hidden mb-3 bg-neutral-200/50 relative">
              <img
                :src="getFirstImage(product)"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <!-- Details -->
            <div class="flex flex-col flex-grow justify-between">
              <div>
                <h4
                  class="font-bold text-sm text-neutral-800 line-clamp-2 leading-snug group-hover:text-burgundy transition-colors"
                >
                  {{ product.name }}
                </h4>
                <p class="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                  {{ product.description }}
                </p>
              </div>

              <div class="mt-3">
                <div class="flex items-center space-x-1.5">
                  <span v-if="product.oldPrice" class="text-xs text-neutral-400 line-through">
                    {{ formatPrice(product.oldPrice) }}
                  </span>
                  <span class="text-sm font-extrabold text-burgundy">
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
                <div class="text-[10px] text-neutral-500 font-medium mt-0.5">
                  {{ product.installments }}
                </div>

                <button
                  class="btn-primary-sm w-full mt-3 flex items-center justify-center space-x-1"
                  @click.stop="addProductToCart(product)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          </div>
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
            :class="currentPage === page ? 'bg-burgundy text-white border-burgundy shadow-md' : 'border-burgundy/10 text-burgundy hover:bg-neutral-100'"
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
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-8"
    >
      <div
        v-if="selectedProduct"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4"
        @click.self="closeProductDetail"
      >
        <div
          class="bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <!-- Modal Header (mobile friendly bar) -->
          <div class="w-12 h-1 bg-neutral-300 rounded-full mx-auto my-3 md:hidden"></div>

          <div
            class="flex justify-between items-center px-6 py-2 md:py-4 border-b border-neutral-100"
          >
            <h3 class="font-bold text-burgundy text-lg">Detalhes do Presente</h3>
            <button
              class="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              @click="closeProductDetail"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Modal Body (Scrollable) -->
          <div class="overflow-y-auto p-6 space-y-5">
            <!-- Product Gallery Support -->
            <div class="space-y-3">
              <!-- Main Image Container with swipe support -->
              <div
                class="aspect-square w-full rounded-2xl overflow-hidden bg-white/20 relative group"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
              >
                <img
                  :src="
                    selectedProduct.images && selectedProduct.images.length > 0
                      ? selectedProduct.images[activeImageIndex]
                      : selectedProduct.image
                  "
                  :alt="selectedProduct.name"
                  class="w-full h-full object-cover transition-all duration-300 select-none"
                  draggable="false"
                />

                <!-- Side Navigation Arrows -->
                <template v-if="selectedProduct.images && selectedProduct.images.length > 1">
                  <button
                    class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90"
                    @click.stop="prevImage"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                    class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90"
                    @click.stop="nextImage"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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

                  <!-- Image Indicators (Dots) on top of Image -->
                  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                    <span
                      v-for="(_, idx) in selectedProduct.images"
                      :key="idx"
                      class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      :class="idx === activeImageIndex ? 'bg-white w-3' : 'bg-white/40'"
                    ></span>
                  </div>
                </template>
              </div>

              <!-- Thumbnails Gallery -->
              <div
                v-if="selectedProduct.images && selectedProduct.images.length > 1"
                class="flex space-x-2 overflow-x-auto pb-1 scrollbar-none justify-center"
              >
                <img
                  v-for="(img, idx) in selectedProduct.images"
                  :key="idx"
                  :src="img"
                  :alt="`${selectedProduct.name} vista ${idx + 1}`"
                  class="gallery-thumbnail"
                  :class="
                    idx === activeImageIndex
                      ? 'gallery-thumbnail-active'
                      : 'gallery-thumbnail-inactive'
                  "
                  @click="activeImageIndex = idx"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <h2 class="text-xl font-bold text-neutral-800 leading-snug">
                {{ selectedProduct.name }}
              </h2>
              <div class="flex items-center space-x-2">
                <span class="badge-discount text-[10px]">{{
                  selectedProduct?.categories
                    ? selectedProduct.categories.map(catId => categories.find(c => c.id === catId)?.name || catId).join(', ')
                    : categories.find((c) => c.id === selectedProduct?.category)?.name
                }}</span>
                <span class="text-xs text-neutral-500 font-medium">{{
                  selectedProduct.installments
                }}</span>
              </div>
            </div>

            <p
              class="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100"
            >
              {{ selectedProduct.description }}
            </p>

            <div class="flex items-center justify-between border-t border-neutral-100 pt-4">
              <div class="flex flex-col">
                <span class="text-xs text-neutral-400 font-medium">Preço</span>
                <div class="flex items-baseline space-x-2">
                  <span
                    v-if="selectedProduct.oldPrice"
                    class="text-sm text-neutral-400 line-through"
                  >
                    {{ formatPrice(selectedProduct.oldPrice) }}
                  </span>
                  <span class="text-2xl font-black text-burgundy">
                    {{ formatPrice(selectedProduct.price) }}
                  </span>
                </div>
              </div>

              <button
                class="btn-primary flex items-center space-x-2 px-8 py-3"
                @click="addProductToCart(selectedProduct)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Comprar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Cart Drawer (Slide out panel) -->
    <div v-if="isCartOpen" class="cart-drawer-overlay" @click="toggleCart"></div>
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isCartOpen" class="cart-drawer">
        <div class="flex items-center justify-between px-6 py-5 border-b border-burgundy/15">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-burgundy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 class="font-extrabold text-burgundy text-lg">Meu Carrinho</h3>
          </div>
          <button
            class="p-2 hover:bg-burgundy/5 text-burgundy rounded-full transition-colors"
            @click="toggleCart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Cart Items List -->
        <div class="flex-grow overflow-y-auto p-6 space-y-4">
          <div
            v-if="cartStore.items.length === 0"
            class="h-full flex flex-col items-center justify-center text-center space-y-4"
          >
            <div class="p-4 bg-white/40 rounded-full text-burgundy/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <p class="font-bold text-burgundy">Seu carrinho está vazio</p>
              <p class="text-xs text-neutral-500 mt-1">
                Adicione presentes florais para demonstrar seu afeto!
              </p>
            </div>
            <button class="btn-primary-sm mt-2" @click="toggleCart">Continuar Comprando</button>
          </div>

          <div
            v-else
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="flex items-center space-x-4 bg-white/45 p-3 rounded-2xl border border-white/40 relative shadow-sm"
          >
            <img
              :src="getFirstImage(item.product)"
              :alt="item.product.name"
              class="w-16 h-16 rounded-xl object-cover"
            />

            <div class="flex-grow min-w-0">
              <h4 class="font-bold text-xs text-neutral-800 truncate">{{ item.product.name }}</h4>
              <span class="text-xs font-semibold text-burgundy block mt-0.5">
                {{ formatPrice(item.product.price) }}
              </span>

              <!-- Quantity Selector -->
              <div class="flex items-center space-x-2 mt-2">
                <button
                  class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90"
                  @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                >
                  -
                </button>
                <span class="text-xs font-bold text-neutral-700 w-4 text-center">{{
                  item.quantity
                }}</span>
                <button
                  class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90"
                  @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              class="p-1.5 text-neutral-400 hover:text-crimson transition-colors self-start"
              @click="cartStore.removeFromCart(item.product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Cart Footer -->
        <div
          v-if="cartStore.items.length > 0"
          class="border-t border-burgundy/15 bg-white/20 p-6 space-y-4"
        >
          <div class="flex justify-between items-center text-neutral-800">
            <span class="font-medium text-sm">Subtotal:</span>
            <span class="font-extrabold text-lg text-burgundy">{{
              formatPrice(cartStore.cartTotal)
            }}</span>
          </div>

          <button
            class="btn-primary w-full py-3.5 flex items-center justify-center space-x-2 text-sm"
            @click="goToCheckout"
          >
            <span>Finalizar Compra</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Mobile Navigation Bar -->
    <div class="mobile-navigation-bar">
      <!-- 1. Início -->
      <button
        class="mobile-nav-item"
        :class="{ 'mobile-nav-item-active': selectedCategory === 'todos' }"
        @click="selectedCategory = 'todos'; router.push('/')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5.5 w-5.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Início</span>
      </button>

      <!-- 2. Destaques -->
      <button
        class="mobile-nav-item"
        :class="{ 'mobile-nav-item-active': selectedCategory === 'destaques' }"
        @click="selectCategory('destaques')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5.5 w-5.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Destaques</span>
      </button>

      <!-- 3. Carrinho -->
      <button class="mobile-nav-item relative" @click="toggleCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5.5 w-5.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span
          v-if="cartStore.cartItemsCount > 0"
          class="cart-badge bg-crimson w-4 h-4 text-[9px] top-1 right-3"
        >
          {{ cartStore.cartItemsCount }}
        </span>
        <span class="text-[10px] mt-0.5 font-semibold">Carrinho</span>
      </button>

      <!-- 4. Contato -->
      <a
        href="https://wa.me/5567999476896?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!"
        target="_blank"
        class="mobile-nav-item"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-5.5 w-5.5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          />
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Contato</span>
      </a>
    </div>

    <!-- Floating WhatsApp button (desktop) -->
    <a
      href="https://wa.me/5567999476896?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!"
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
