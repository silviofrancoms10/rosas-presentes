// Plugin client-only: roda apenas no browser, antes das páginas montarem.
// Garante que o carrinho é restaurado do localStorage em qualquer navegação.
import { useCartStore } from '~/stores/cartStore'

export default defineNuxtPlugin(() => {
  const cartStore = useCartStore()
  cartStore.loadCart()
})
