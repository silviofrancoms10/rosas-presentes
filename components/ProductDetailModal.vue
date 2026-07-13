<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Product } from '~/types/product'

const props = defineProps({
  product: {
    type: Object as PropType<Product | null>,
    default: null,
  },
  categories: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'add-to-cart'])

const activeImageIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

// Reset active image when the product changes
watch(
  () => props.product,
  () => {
    activeImageIndex.value = 0
  }
)

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

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

function nextImage() {
  if (!props.product || !props.product.images) return
  const len = props.product.images.length
  if (len === 0) return
  activeImageIndex.value = (activeImageIndex.value + 1) % len
}

function prevImage() {
  if (!props.product || !props.product.images) return
  const len = props.product.images.length
  if (len === 0) return
  activeImageIndex.value = (activeImageIndex.value - 1 + len) % len
}

function closeDetail() {
  emit('close')
}

function handleAddToCart() {
  if (props.product) {
    emit('add-to-cart', props.product)
  }
}

function getProductCategoriesLabel(): string {
  if (!props.product) return ''
  if (props.product.categories && props.product.categories.length > 0) {
    return props.product.categories
      .map((catId) => props.categories.find((c) => c.id === catId)?.name || catId)
      .join(', ')
  }
  return props.categories.find((c) => c.id === props.product?.category)?.name || ''
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div
      v-if="product"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4"
      @click.self="closeDetail"
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
            @click="closeDetail"
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
                  product.images && product.images.length > 0
                    ? product.images[activeImageIndex]
                    : product.image
                "
                :alt="product.name"
                class="w-full h-full object-cover transition-all duration-300 select-none"
                draggable="false"
              />

              <!-- Side Navigation Arrows -->
              <template v-if="product.images && product.images.length > 1">
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
                    v-for="(_, idx) in product.images"
                    :key="idx"
                    class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    :class="idx === activeImageIndex ? 'bg-white w-3' : 'bg-white/40'"
                  ></span>
                </div>
              </template>
            </div>

            <!-- Thumbnails Gallery -->
            <div
              v-if="product.images && product.images.length > 1"
              class="flex space-x-2 overflow-x-auto pb-1 scrollbar-none justify-center"
            >
              <img
                v-for="(img, idx) in product.images"
                :key="idx"
                :src="img"
                :alt="`${product.name} vista ${idx + 1}`"
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
              {{ product.name }}
            </h2>
            <div class="flex items-center space-x-2">
              <span class="badge-discount text-[10px]">{{ getProductCategoriesLabel() }}</span>
              <span class="text-xs text-neutral-500 font-medium">{{
                product.installments
              }}</span>
            </div>
          </div>

          <p
            class="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100"
          >
            {{ product.description }}
          </p>

          <div class="flex items-center justify-between border-t border-neutral-100 pt-4">
            <div class="flex flex-col">
              <span class="text-xs text-neutral-400 font-medium">Preço</span>
              <div class="flex items-baseline space-x-2">
                <span
                  v-if="product.oldPrice"
                  class="text-sm text-neutral-400 line-through"
                >
                  {{ formatPrice(product.oldPrice) }}
                </span>
                <span class="text-2xl font-black text-burgundy">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
            </div>

            <button
              class="btn-primary flex items-center space-x-2 px-8 py-3"
              @click="handleAddToCart"
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
</template>
