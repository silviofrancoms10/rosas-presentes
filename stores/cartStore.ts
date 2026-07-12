import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // Inicializa diretamente do localStorage na criação do store (client-side)
  function _readFromStorage(): CartItem[] {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('rosas_presentes_cart')
        if (saved) return JSON.parse(saved) as CartItem[]
      } catch (e) {
        console.error('Failed to parse saved cart data', e)
      }
    }
    return []
  }

  const items = ref<CartItem[]>(_readFromStorage())

  function loadCart() {
    const saved = _readFromStorage()
    if (saved.length > 0) {
      items.value = saved
    }
  }

  // Persiste no localStorage sempre que o carrinho mudar (client-only)
  watch(
    items,
    (newItems) => {
      if (import.meta.client) {
        localStorage.setItem('rosas_presentes_cart', JSON.stringify(newItems))
      }
    },
    { deep: true }
  )

  const cartItemsCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  })

  function addToCart(product: Product) {
    const existingItem = items.value.find((item) => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: string) {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    cartItemsCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
  }
})
