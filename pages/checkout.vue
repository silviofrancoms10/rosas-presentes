<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

useHead({
  title: 'Finalizar Pedido | Rosas Presentes'
})

// State
const customerName = ref('')
const customerPhone = ref('')
const recipientName = ref('')
const deliveryAddress = ref('')
const deliveryDate = ref('')
const deliveryTime = ref('')
const cardMessage = ref('')
const paymentMethod = ref('pix')
const isCartOpen = ref(false)

const timeSlots = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
]

const isCalendarOpen = ref(false)
const calendarDate = ref(new Date())
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const currentMonthYearLabel = computed(() => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  return `${months[calendarDate.value.getMonth()]} ${calendarDate.value.getFullYear()}`
})

const firstDayOffset = computed(() => {
  const d = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), 1)
  return d.getDay()
})

const daysInMonth = computed(() => {
  const d = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth() + 1, 0)
  return d.getDate()
})

function toggleCalendar() {
  isCalendarOpen.value = !isCalendarOpen.value
}

function prevMonth() {
  calendarDate.value = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth() - 1, 1)
}

// Prevent moving to past months
function nextMonth() {
  calendarDate.value = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth() + 1, 1)
}

function selectCalendarDay(day: number) {
  const dateObj = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), day)
  const dd = String(dateObj.getDate()).padStart(2, '0')
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
  const yyyy = dateObj.getFullYear()

  deliveryDate.value = `${dd}/${mm}/${yyyy}`
  isCalendarOpen.value = false

  if (import.meta.client) {
    const el = document.getElementById('deliv-date') as HTMLInputElement | null
    if (el) el.setCustomValidity('')
  }
}

function isDaySelected(day: number) {
  if (!deliveryDate.value) return false
  const [dd, mm, yyyy] = deliveryDate.value.split('/')
  return (
    Number(dd) === day &&
    Number(mm) === (calendarDate.value.getMonth() + 1) &&
    Number(yyyy) === calendarDate.value.getFullYear()
  )
}

function setCustomValidityBR(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  if (target.validity.valueMissing) {
    target.setCustomValidity('Por favor, preencha este campo.')
  } else {
    target.setCustomValidity('')
  }
}

function clearCustomValidity(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  target.setCustomValidity('')
}

// Click outside handler to close calendar popup
if (import.meta.client) {
  document.addEventListener('click', (e) => {
    const el = document.getElementById('calendar-container')
    const input = document.getElementById('deliv-date')
    if (el && !el.contains(e.target as Node) && input && !input.contains(e.target as Node)) {
      isCalendarOpen.value = false
    }
  })
}

// Card details
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

// Success state
const isSubmitted = ref(false)
const orderNumber = ref('')

// Computed
const hasItems = computed(() => cartStore.items.length > 0)

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function getFirstImage(product: any): string {
  if (product.images && product.images.length > 0) {
    return product.images[0]
  }
  return product.image
}

async function handleCheckoutSubmit() {
  if (cartStore.items.length === 0) return

  try {
    const finalPrice = paymentMethod.value === 'pix' ? cartStore.cartTotal * 0.95 : cartStore.cartTotal

    const orderBody = {
      customerName: customerName.value,
      customerPhone: customerPhone.value,
      recipientName: recipientName.value,
      deliveryAddress: deliveryAddress.value,
      deliveryDate: deliveryDate.value,
      deliveryTime: deliveryTime.value,
      cardMessage: cardMessage.value,
      paymentMethod: paymentMethod.value,
      totalPrice: finalPrice,
      items: cartStore.items.map((item: any) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity
      }))
    }

    const response = await $fetch<{ ok: boolean; orderId: string; paymentUrl?: string }>('/api/orders', {
      method: 'POST',
      body: orderBody
    })

    if (response && response.ok) {
      // Clear the cart
      cartStore.clearCart()
      
      if (response.paymentUrl) {
        // Redireciona para o checkout seguro da InfinitePay
        window.location.href = response.paymentUrl
      } else {
        // Fallback local se não houver URL de pagamento
        orderNumber.value = response.orderId
        isSubmitted.value = true
      }
    }
  } catch (err: any) {
    console.error('Erro no checkout:', err)
    alert(err.data?.statusMessage || 'Erro ao processar o pedido. Tente novamente.')
  }
}

function goBackHome() {
  router.push('/')
}

const route = useRoute()

onMounted(async () => {
  // Se estiver retornando do redirecionamento da InfinitePay após o sucesso
  if (route.query.success === 'true' && route.query.order_id) {
    const orderId = route.query.order_id as string
    try {
      const orderData = await $fetch<{ id: string; deliveryDate: string; deliveryTime: string }>(`/api/orders?id=${orderId}`)
      if (orderData) {
        orderNumber.value = orderData.id
        deliveryDate.value = orderData.deliveryDate
        deliveryTime.value = orderData.deliveryTime
        isSubmitted.value = true
        cartStore.clearCart()
      }
    } catch (err) {
      console.error('Erro ao buscar dados do pedido:', err)
    }
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Reusable Header Component -->
    <Header @toggle-cart="isCartOpen = !isCartOpen" />

    <main class="max-w-4xl mx-auto px-4 pt-8 flex-grow">
      
      <!-- Success State -->
      <div v-if="isSubmitted" class="form-card text-center py-12 space-y-6 max-w-xl mx-auto my-8">
        <div class="w-20 h-20 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div class="space-y-2">
          <h2 class="text-2xl font-extrabold text-burgundy">Pedido Recebido!</h2>
          <p class="text-sm text-neutral-600">
            Agradecemos sua preferência. Seu pedido foi processado com sucesso.
          </p>
          <div class="flex flex-col items-center gap-2 mt-4">
            <div class="inline-block bg-white/60 border border-burgundy/10 px-4 py-2 rounded-xl font-mono text-sm font-bold text-burgundy">
              Número do Pedido: {{ orderNumber }}
            </div>
            <div class="text-xs text-neutral-600 mt-1 bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-2">
              Entrega programada para: <strong class="text-burgundy">{{ deliveryDate }}</strong>
              <span v-if="deliveryTime"> às <strong class="text-burgundy">{{ deliveryTime }}</strong></span>
            </div>
          </div>
        </div>

        <p class="text-xs text-neutral-500 max-w-sm mx-auto">
          Enviamos uma confirmação e atualizações de entrega para o seu WhatsApp cadastrado.
        </p>

        <button class="btn-primary px-8" @click="goBackHome">
          Continuar Comprando
        </button>
      </div>

      <!-- Main Checkout Form & Summary -->
      <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        <!-- Cart empty state -->
        <div v-if="!hasItems" class="col-span-5 form-card text-center py-12 space-y-4">
          <p class="font-bold text-burgundy">Seu carrinho está vazio</p>
          <p class="text-sm text-neutral-500">Adicione itens ao carrinho antes de prosseguir para o pagamento.</p>
          <button class="btn-primary" @click="goBackHome">
            Ver Produtos
          </button>
        </div>

        <template v-else>
          <!-- Left side: Forms (3 cols) -->
          <div class="col-span-1 md:col-span-3 space-y-6">
            <form @submit.prevent="handleCheckoutSubmit" class="space-y-6">
              
              <!-- Customer Info -->
              <div class="form-card space-y-4 relative z-10">
                <h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2">
                  Seus Dados
                </h3>
                
                <div>
                  <label for="cust-name" class="form-label">Nome Completo</label>
                  <input 
                    id="cust-name" 
                    v-model="customerName" 
                    type="text" 
                    required 
                    placeholder="Seu nome completo" 
                    class="form-input"
                    @invalid="setCustomValidityBR"
                    @input="clearCustomValidity"
                  />
                </div>
                
                <div>
                  <label for="cust-phone" class="form-label">WhatsApp / Telefone</label>
                  <input 
                    id="cust-phone" 
                    v-model="customerPhone" 
                    type="tel" 
                    required 
                    placeholder="(00) 90000-0000" 
                    class="form-input"
                    @invalid="setCustomValidityBR"
                    @input="clearCustomValidity"
                  />
                </div>
              </div>

              <!-- Delivery Details -->
              <div class="form-card space-y-4 !overflow-visible relative z-30">
                <h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2">
                  Detalhes da Entrega (Presente)
                </h3>
                
                <div>
                  <label for="rec-name" class="form-label">Nome de quem vai receber</label>
                  <input 
                    id="rec-name" 
                    v-model="recipientName" 
                    type="text" 
                    required 
                    placeholder="Nome do destinatário" 
                    class="form-input"
                    @invalid="setCustomValidityBR"
                    @input="clearCustomValidity"
                  />
                </div>

                <div>
                  <label for="address" class="form-label">Endereço de Entrega</label>
                  <input 
                    id="address" 
                    v-model="deliveryAddress" 
                    type="text" 
                    required 
                    placeholder="Rua, número, complemento, bairro e cidade" 
                    class="form-input"
                    @invalid="setCustomValidityBR"
                    @input="clearCustomValidity"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="deliv-date" class="form-label">Data de Entrega</label>
                    <div class="relative" id="calendar-container">
                      <input 
                        id="deliv-date" 
                        type="text" 
                        v-model="deliveryDate"
                        placeholder="Selecione a data"
                        readonly
                        @click="isCalendarOpen = !isCalendarOpen"
                        class="form-input bg-white cursor-pointer pr-10 select-none"
                        required
                        @invalid="setCustomValidityBR"
                        @change="clearCustomValidity"
                      />
                      <!-- Calendar Icon -->
                      <div class="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                      <!-- Custom Calendar Popup (Centered below input on Mobile, Left-aligned on Desktop) -->
                      <div 
                        v-if="isCalendarOpen" 
                        class="absolute top-full mt-1 left-0 right-0 mx-auto z-50 bg-neutral-100 border border-neutral-200/80 rounded-2xl shadow-lg p-3 w-[240px] sm:left-0 sm:translate-x-0"
                      >
                         <!-- Calendar Header -->
                         <div class="flex justify-between items-center bg-neutral-200/50 border border-neutral-300/40 rounded-xl p-1.5 mb-2">
                           <button type="button" @click.stop="prevMonth" class="p-1 hover:bg-neutral-300/60 rounded-lg text-burgundy transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                             </svg>
                           </button>
                           <span class="font-bold text-[10px] text-burgundy uppercase tracking-wider">{{ currentMonthYearLabel }}</span>
                           <button type="button" @click.stop="nextMonth" class="p-1 hover:bg-neutral-300/60 rounded-lg text-burgundy transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                             </svg>
                           </button>
                         </div>

                         <!-- Days of Week Headers -->
                         <div class="grid grid-cols-7 gap-0.5 text-center text-[9px] font-bold text-neutral-400 uppercase mb-1">
                           <span v-for="d in weekDays" :key="d">{{ d }}</span>
                         </div>

                         <!-- Days Grid -->
                         <div class="grid grid-cols-7 gap-0.5">
                           <!-- Empty placeholders for alignment -->
                           <span v-for="p in firstDayOffset" :key="'p'+p"></span>
                           <!-- Days of Month -->
                           <button
                             v-for="day in daysInMonth"
                             :key="day"
                             type="button"
                             @click.stop="selectCalendarDay(day)"
                             class="h-7 w-7 text-[11px] font-semibold rounded-lg flex items-center justify-center transition-all"
                             :class="isDaySelected(day) ? 'bg-burgundy text-white font-bold' : 'hover:bg-neutral-200/70 text-neutral-700'"
                           >
                             {{ day }}
                           </button>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label for="deliv-time" class="form-label">Horário de Entrega</label>
                    <div class="relative">
                      <select 
                        id="deliv-time" 
                        v-model="deliveryTime" 
                        required 
                        class="form-input bg-white appearance-none pr-10 cursor-pointer"
                        @invalid="setCustomValidityBR"
                        @change="clearCustomValidity"
                      >
                        <option value="" disabled selected>Selecione o horário</option>
                        <option v-for="time in timeSlots" :key="time" :value="time">
                          {{ time }}
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="message" class="form-label">Mensagem para o Cartão (Opcional)</label>
                  <textarea 
                    id="message" 
                    v-model="cardMessage" 
                    rows="3" 
                    placeholder="Escreva uma bela mensagem de carinho..." 
                    class="form-input resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Payment Details -->
              <div class="form-card space-y-4 relative z-10">
                <h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2">
                  Método de Pagamento
                </h3>
                
                <div class="grid grid-cols-2 gap-3">
                  <label 
                    class="border rounded-xl p-3 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all"
                    :class="paymentMethod === 'pix' ? 'border-burgundy bg-burgundy/5 text-burgundy font-bold' : 'border-neutral-200 bg-white/40'"
                  >
                    <input type="radio" value="pix" v-model="paymentMethod" class="sr-only" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span class="text-xs">Pagar com PIX</span>
                  </label>

                  <label 
                    class="border rounded-xl p-3 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all"
                    :class="paymentMethod === 'card' ? 'border-burgundy bg-burgundy/5 text-burgundy font-bold' : 'border-neutral-200 bg-white/40'"
                  >
                    <input type="radio" value="card" v-model="paymentMethod" class="sr-only" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span class="text-xs">Cartão de Crédito</span>
                  </label>
                </div>

                <!-- PIX details -->
                <div v-if="paymentMethod === 'pix'" class="p-4 bg-white/40 rounded-xl border border-dashed border-burgundy/20 text-center space-y-2">
                  <p class="text-xs text-neutral-600">
                    O código copia e cola PIX será gerado após clicar em Finalizar. 
                    Desconto de 5% já aplicado!
                  </p>
                </div>

                <!-- Credit Card details -->
                <div v-if="paymentMethod === 'card'" class="p-4 bg-white/40 rounded-xl border border-dashed border-burgundy/20 text-center space-y-2">
                  <p class="text-xs text-neutral-600">
                    O pagamento será processado de forma segura na InfinitePay.
                    Suporta parcelamento em até 12x!
                  </p>
                </div>
              </div>

              <!-- Button CTA -->
              <button type="submit" class="btn-primary w-full py-4 text-base">
                Finalizar e Pagar {{ formatPrice(paymentMethod === 'pix' ? cartStore.cartTotal * 0.95 : cartStore.cartTotal) }}
              </button>
            </form>
          </div>

          <!-- Right side: Cart Summary (2 cols) -->
          <div class="col-span-1 md:col-span-2 space-y-4">
            <div class="form-card space-y-4 sticky top-24">
              <h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2">
                Resumo do Pedido
              </h3>
              
              <div class="max-h-[300px] overflow-y-auto space-y-3 pr-1">
                <div 
                  v-for="item in cartStore.items" 
                  :key="item.product.id"
                  class="flex items-center space-x-3 text-xs"
                >
                  <img :src="getFirstImage(item.product)" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div class="flex-grow min-w-0">
                    <p class="font-bold text-neutral-800 truncate">{{ item.product.name }}</p>
                    <p class="text-neutral-500">{{ item.quantity }}x de {{ formatPrice(item.product.price) }}</p>
                  </div>
                  <span class="font-bold text-neutral-800">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </span>
                </div>
              </div>

              <div class="border-t border-burgundy/10 pt-3 space-y-2 text-sm">
                <div class="flex justify-between text-neutral-600 text-xs">
                  <span>Subtotal:</span>
                  <span>{{ formatPrice(cartStore.cartTotal) }}</span>
                </div>
                <div class="flex justify-between text-neutral-600 text-xs">
                  <span>Entrega:</span>
                  <span class="text-[#25d366] font-semibold">Grátis</span>
                </div>
                <div v-if="paymentMethod === 'pix'" class="flex justify-between text-[#c1121f] text-xs">
                  <span>Desconto PIX (5%):</span>
                  <span>-{{ formatPrice(cartStore.cartTotal * 0.05) }}</span>
                </div>
                
                <div class="flex justify-between font-extrabold text-base text-burgundy border-t border-burgundy/15 pt-2">
                  <span>Total:</span>
                  <span>{{ formatPrice(paymentMethod === 'pix' ? cartStore.cartTotal * 0.95 : cartStore.cartTotal) }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
    <!-- Site Footer -->
    <Footer />

    <!-- Mobile Navigation Bar -->
    <MobileNavBar @toggle-cart="isCartOpen = !isCartOpen" />

    <!-- Cart Drawer (Slide out panel) inside Checkout too -->
    <CartDrawer v-model:isOpen="isCartOpen" :is-checkout-page="true" />
  </div>
</template>
