<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

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

function handleCheckoutSubmit() {
  if (cartStore.items.length === 0) return

  // Mock ordering process
  orderNumber.value = 'RP-' + Math.floor(100000 + Math.random() * 900000)
  
  // Clear the cart
  cartStore.clearCart()
  
  // Show success view
  isSubmitted.value = true
}

function goBackHome() {
  router.push('/')
}


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

                <!-- Credit Card fields -->
                <div v-if="paymentMethod === 'card'" class="space-y-3 pt-2">
                  <div>
                    <label for="card-num" class="form-label">Número do Cartão</label>
                    <input 
                      id="card-num" 
                      v-model="cardNumber" 
                      type="text" 
                      required 
                      placeholder="0000 0000 0000 0000" 
                      class="form-input"
                      @invalid="setCustomValidityBR"
                      @input="clearCustomValidity"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label for="expiry" class="form-label">Validade</label>
                      <input 
                        id="expiry" 
                        v-model="cardExpiry" 
                        type="text" 
                        required 
                        placeholder="MM/AA" 
                        class="form-input"
                        @invalid="setCustomValidityBR"
                        @input="clearCustomValidity"
                      />
                    </div>
                    <div>
                      <label for="cvv" class="form-label">CVV</label>
                      <input 
                        id="cvv" 
                        v-model="cardCvv" 
                        type="text" 
                        required 
                        placeholder="000" 
                        class="form-input"
                        @invalid="setCustomValidityBR"
                        @input="clearCustomValidity"
                      />
                    </div>
                  </div>
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
    <div class="mobile-navigation-bar">
      <!-- 1. Início -->
      <button class="mobile-nav-item" @click="goBackHome">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Início</span>
      </button>

      <!-- 2. Destaques -->
      <button class="mobile-nav-item" @click="router.push({ path: '/', query: { category: 'destaques' } })">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Destaques</span>
      </button>

      <!-- 3. Carrinho -->
      <button class="mobile-nav-item relative" @click="isCartOpen = !isCartOpen">
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
        href="https://wa.me/5567999476896?text=Olá,%20tenho%20uma%20dúvida%20sobre%20o%20meu%20pedido!" 
        target="_blank" 
        class="mobile-nav-item"
      >
        <svg viewBox="0 0 24 24" class="h-5.5 w-5.5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span class="text-[10px] mt-0.5 font-semibold">Contato</span>
      </a>
    </div>

    <!-- Cart Drawer (Slide out panel) inside Checkout too -->
    <div v-if="isCartOpen" class="cart-drawer-overlay" @click="isCartOpen = false"></div>
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isCartOpen" class="cart-drawer">
        <div class="flex items-center justify-between px-6 py-5 border-b border-burgundy/15">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 class="font-extrabold text-burgundy text-lg">Meu Carrinho</h3>
          </div>
          <button class="p-2 hover:bg-burgundy/5 text-burgundy rounded-full transition-colors" @click="isCartOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cart Items List -->
        <div class="flex-grow overflow-y-auto p-6 space-y-4">
          <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div class="p-4 bg-white/40 rounded-full text-burgundy/40">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p class="font-bold text-burgundy">Seu carrinho está vazio</p>
            </div>
            <button class="btn-primary-sm mt-2" @click="isCartOpen = false">
              Voltar
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
                <span class="text-xs font-bold text-neutral-700 w-4 text-center">{{ item.quantity }}</span>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Cart Footer -->
        <div v-if="cartStore.items.length > 0" class="border-t border-burgundy/15 bg-white/20 p-6 space-y-4">
          <div class="flex justify-between items-center text-neutral-800">
            <span class="font-medium text-sm">Subtotal:</span>
            <span class="font-extrabold text-lg text-burgundy">{{ formatPrice(cartStore.cartTotal) }}</span>
          </div>
          
          <button class="btn-primary w-full py-3.5 flex items-center justify-center space-x-2 text-sm" @click="isCartOpen = false">
            <span>Continuar Checkout</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
