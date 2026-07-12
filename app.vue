<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <NuxtPage />
</template>
