<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'

const emit = defineEmits(['toggle-cart'])

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

// Compute active category based on query parameters
const activeCategory = computed(() => {
  if (route.path !== '/') return ''
  return route.query.category || 'todos'
})

function navHome() {
  if (route.path === '/') {
    // If already on homepage, just reset category query
    router.push({ path: '/', query: {} })
  } else {
    router.push('/')
  }
}

function navDestaques() {
  router.push({ path: '/', query: { category: 'destaques' } })
}

function handleCartClick() {
  emit('toggle-cart')
}
</script>

<template>
  <div class="mobile-navigation-bar">
    <!-- 1. Início -->
    <button
      class="mobile-nav-item"
      :class="{ 'mobile-nav-item-active': activeCategory === 'todos' }"
      @click="navHome"
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
      :class="{ 'mobile-nav-item-active': activeCategory === 'destaques' }"
      @click="navDestaques"
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
    <button class="mobile-nav-item relative" @click="handleCartClick">
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
</template>
