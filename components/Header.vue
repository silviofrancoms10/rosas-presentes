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
      <div class="flex items-center space-x-2 cursor-pointer" @click="router.push('/')">
        <span class="text-xl md:text-2xl font-bold tracking-tight">🌹 Rosas Presentes</span>
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
