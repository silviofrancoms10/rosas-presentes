<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const { data: categoriesData } = await useFetch<any[]>('/api/categories')
const categories = computed(() => categoriesData.value || [])


const currentCategory = computed(() => {
  return route.query.category || 'todos'
})

function selectCategory(categoryId: string) {
  router.push({ path: '/', query: { category: categoryId } })
}

const emit = defineEmits(['toggle-cart'])
</script>

<template>
  <header class="header-glass">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3 cursor-pointer" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 flex-shrink-0" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="goldGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe259" />
              <stop offset="100%" stop-color="#ffa751" />
            </linearGradient>
          </defs>
          <path d="M416 128c-18.9 4.25-36.8 8.94-53.7 13.95-40.5 12-75.5 27.15-105.4 41.65-19.3 9.37-26.2 13.51-51.5 28.23-58.4 33.69-93.4 77.4-93.4 142.81C112 428.55 167.6 480 256 480s144-55.81 144-129.72S339 225.24 416 128z" stroke="url(#goldGradientHeader)" stroke-linecap="round" stroke-linejoin="round" stroke-width="28"/>
          <path d="M264 180.19c-19.69-27-38.2-38.69-52.7-46.59C162.6 107.1 96 96 96 96c41.5 43.7 37.2 90.1 32 128 0 0-3.87 32.88 1.91 58.41" stroke="url(#goldGradientHeader)" stroke-linecap="round" stroke-linejoin="round" stroke-width="28"/>
          <path d="M372 139.15C356.55 102.6 336 64 336 64s-63.32 0-135.69 64M253.48 87.57C221.25 45.81 176 32 176 32c-15.3 20.8-28.79 51.58-34.87 74.17" stroke="url(#goldGradientHeader)" stroke-linecap="round" stroke-linejoin="round" stroke-width="28"/>
        </svg>
        <span class="text-xl md:text-2xl font-bold tracking-tight">Rosas Presentes</span>
      </div>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center space-x-6 text-sm font-semibold">
        <button 
          v-for="cat in categories" 
          :key="cat.id" 
          class="hover:text-white transition-colors cursor-pointer pb-1 border-b-2" 
          :class="currentCategory === cat.id ? 'text-white border-white' : 'text-almond/75 border-transparent'"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </button>

      </nav>
      
      <!-- Cart Icon -->
      <button class="relative p-2.5 hover:bg-white/10 rounded-xl transition-all" @click="emit('toggle-cart')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span v-if="cartStore.cartItemsCount > 0" class="absolute -top-1 -right-1 bg-white text-burgundy text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white/20 animate-pulse">
          {{ cartStore.cartItemsCount }}
        </span>
      </button>
    </div>
  </header>
</template>
