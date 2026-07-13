<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const emit = defineEmits(['click', 'add-to-cart'])

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function getFirstImage(product: Product): string {
  if (product.images && product.images.length > 0) {
    return product.images[0] || product.image
  }
  return product.image
}

function handleClick() {
  emit('click', props.product)
}

function handleAddToCart() {
  emit('add-to-cart', props.product)
}
</script>

<template>
  <div class="product-card-glass group cursor-pointer" @click="handleClick">
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
          @click.stop="handleAddToCart"
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
</template>
