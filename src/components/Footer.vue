<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Number requested: (67) 99947-6896 -> 5567999476896
const whatsappNumber = '5567999476896'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20flores%20e%20cestas!`
const phoneLink = 'tel:+5567999476896'
const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=Rua+Benito+Melch%C3%ADades+de+Oliveira,+227+-+Nasser,+Campo+Grande+-+MS,+79117-320'

const categories = [
  { id: 'todos', name: '🌸 Todos' },
  { id: 'buques', name: '💐 Buquês' },
  { id: 'cestas', name: '🧺 Cestas' },
  { id: 'presentes', name: '🎁 Presentes' },
]

function selectCategory(categoryId: string) {
  router.push({ path: '/', query: { category: categoryId } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToCheckout() {
  router.push('/checkout')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer
    class="bg-gradient-to-b from-[#4a0000] to-[#2d0000] text-neutral-100 pt-16 pb-24 md:pb-8 px-4 border-t border-white/10 mt-16 relative overflow-hidden"
  >
    <!-- Decorative background elements -->
    <div
      class="absolute -top-24 -left-24 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-24 -right-24 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div
      class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10"
    >
      <!-- Column 1: Store & Contact -->
      <div class="space-y-5">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold tracking-tight text-white drop-shadow-sm"
            >🌹 Rosas Presentes</span
          >
        </div>
        <p class="text-sm text-neutral-300/90 leading-relaxed">
          Especializada em floricultura, cestas de café da manhã, buquês e presentes especiais para
          emocionar quem você ama em Campo Grande - MS.
        </p>
        <div class="space-y-3.5 pt-2">
          <!-- WhatsApp Link -->
          <a
            :href="whatsappLink"
            target="_blank"
            class="flex items-center space-x-3 text-sm text-neutral-200 hover:text-[#25d366] transition-colors group w-max"
          >
            <div
              class="p-2 bg-white/5 group-hover:bg-[#25d366]/10 rounded-xl transition-colors border border-white/5 group-hover:border-[#25d366]/20"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </div>
            <span class="font-semibold text-white group-hover:text-white transition-colors"
              >(67) 99947-6896</span
            >
          </a>

          <!-- Telephone Link -->
          <a
            :href="phoneLink"
            class="flex items-center space-x-3 text-sm text-neutral-300 hover:text-white transition-colors group w-max"
          >
            <div
              class="p-2 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5"
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
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span>Ligue para Nós</span>
          </a>

          <!-- Address Link -->
          <a
            :href="mapsLink"
            target="_blank"
            class="flex items-start space-x-3 text-sm text-neutral-300 hover:text-white transition-colors group"
          >
            <div
              class="p-2 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5 mt-0.5 shrink-0"
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
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span class="leading-relaxed">
              Rua Benito Melchíades de Oliveira, 227 - Nasser / Coophasul, Campo Grande - MS,
              79117-320
            </span>
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links & Navigation -->
      <div class="space-y-5">
        <h4 class="text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2">
          Menu de Categorias
        </h4>
        <ul class="space-y-3 text-sm">
          <li v-for="cat in categories" :key="cat.id">
            <button
              @click="selectCategory(cat.id)"
              class="hover:text-white text-neutral-300 transition-colors flex items-center space-x-2 cursor-pointer focus:outline-none"
            >
              <span>{{ cat.name }}</span>
            </button>
          </li>
          <li class="pt-2">
            <button
              @click="goToCheckout"
              class="hover:text-white text-neutral-300 transition-colors flex items-center space-x-2 cursor-pointer font-semibold focus:outline-none"
            >
              <span>💳 Finalizar Compra</span>
            </button>
          </li>
        </ul>

        <h4 class="text-base font-bold text-white tracking-wide pt-4 pb-2 border-b border-white/10">
          Siga-nos
        </h4>
        <div class="flex items-center space-x-4 pt-1">
          <!-- Facebook Link -->
          <a
            href="https://www.facebook.com/search/top/?q=cesta%20caf%C3%A9%20rosas%20e%20presentes&epa=SEARCH_BOX"
            target="_blank"
            class="p-2.5 bg-white/5 hover:bg-[#1877f2] hover:text-white rounded-xl transition-all duration-300 border border-white/5 hover:scale-105 active:scale-95"
            aria-label="Facebook"
          >
            <svg
              class="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </a>
          <!-- Instagram Link -->
          <a
            href="https://www.instagram.com/"
            target="_blank"
            class="p-2.5 bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white rounded-xl transition-all duration-300 border border-white/5 hover:scale-105 active:scale-95"
            aria-label="Instagram"
          >
            <svg
              class="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Column 3: Notice & Working Hours -->
      <div class="space-y-5 lg:col-span-2">
        <h4 class="text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2">
          Avisos e Funcionamento
        </h4>
        <div class="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4 text-sm">
          <div class="space-y-2">
            <h5 class="font-semibold text-white flex items-center space-x-2 text-crimson-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-crimson shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Horários em Datas Comemorativas</span>
            </h5>
            <p class="text-neutral-300 leading-relaxed text-xs">
              No <strong class="text-white">Dia das Mães</strong> e
              <strong class="text-white">Dia dos Namorados</strong> (e vésperas), nossas entregas
              iniciam a partir das <strong class="text-white">05:00h</strong> da manhã, com
              atendimento presencial a partir das <strong class="text-white">06:00h</strong> e
              atendimento via WhatsApp a partir das <strong class="text-white">08:00h</strong>.
            </p>
          </div>

          <div class="border-t border-white/10 pt-3.5 space-y-2">
            <h5 class="font-semibold text-white flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Política de Entrega</span>
            </h5>
            <p class="text-neutral-300 leading-relaxed text-xs">
              Caso seja realizada a tentativa de entrega e o destinatário não esteja no local, será
              cobrada uma taxa de reentrega para a nova tentativa, ou o comprador poderá retirar o
              presente diretamente em nossa loja física.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments section -->
    <div class="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="space-y-2 text-center md:text-left">
          <h4 class="text-sm font-bold text-white tracking-wide">Formas de Pagamento Aceitas</h4>
          <div
            class="flex flex-wrap justify-center md:justify-start gap-2.5 text-xs text-neutral-300"
          >
            <span
              class="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-white/10 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Pix</span>
            </span>
            <span
              class="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-white/10 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>Cartão de Crédito / Débito (Presencial & e-Commerce)</span>
            </span>
            <span
              class="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-white/10 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span>Link de Pagamento (Seguro)</span>
            </span>
            <span
              class="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-white/10 transition-colors"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Depósito / Transferência Bancária</span>
            </span>
          </div>
          <p class="text-[11px] text-neutral-400 mt-1 italic">
            * Sempre após efetuar o pagamento, favor enviar o comprovante de pagamento via WhatsApp.
          </p>
        </div>
      </div>
    </div>

    <!-- Copyright and developer tag -->
    <div
      class="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 gap-4"
    >
      <p>© 2026 Rosas & Presentes. Todos os direitos reservados.</p>
      <div class="flex items-center space-x-1">
        <span>Desenvolvido com</span>
        <span class="text-crimson text-sm">♥</span>
        <span>para Campo Grande - MS</span>
      </div>
    </div>
  </footer>
</template>
