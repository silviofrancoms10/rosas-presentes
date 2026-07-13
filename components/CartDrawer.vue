<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'
import type { Product } from '~/types/product'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  isCheckoutPage: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isOpen'])

const cartStore = useCartStore()
const router = useRouter()

function closeCart() {
  emit('update:isOpen', false)
}

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

function handleAction() {
  closeCart()
  if (!props.isCheckoutPage) {
    router.push('/checkout')
  }
}
</script>

<template>
  <div>
    <!-- Cart Drawer Overlay -->
    <div v-if="isOpen" class="cart-drawer-overlay" @click="closeCart"></div>

    <!-- Cart Drawer Panel -->
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isOpen" class="cart-drawer">
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
            @click="closeCart"
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
            <button class="btn-primary-sm mt-2" @click="closeCart">
              {{ isCheckoutPage ? 'Voltar' : 'Continuar Comprando' }}
            </button>
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
            @click="handleAction"
          >
            <span>{{ isCheckoutPage ? 'Continuar Checkout' : 'Finalizar Compra' }}</span>
            <svg
              v-if="!isCheckoutPage"
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
  </div>
</template>
