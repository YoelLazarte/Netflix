<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import MovieModal from './Modal/MovieModal.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const showModal = ref(false)
const cardRef = ref(null)
const hoverCardRef = ref(null)
const isCardHovered = ref(false)
const isMobile = ref(false)
let hoverTimer = null

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const showHoverCard = () => {
  if(isMobile.value) return

  isCardHovered.value = true
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(async () => {
    isHovered.value = true
    // Esperar a que el DOM se actualice antes de posicionar
    await nextTick()
    positionHoverCard()
  }, 500)
}

const hideHoverCard = () => {
  isCardHovered.value = false
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    isHovered.value = false
  }, 300)
}

const keepHoverCard = () => {
  clearTimeout(hoverTimer)
}

const openModal = () => {
  showModal.value = true
  isHovered.value = false // Ocultar hover card cuando se abre modal
}

const closeModal = () => {
  showModal.value = false
}

const positionHoverCard = () => {
  if (!cardRef.value || !hoverCardRef.value) return
  
  const cardRect = cardRef.value.getBoundingClientRect()
  const hoverCard = hoverCardRef.value
  const cardWidth = 384 // w-96 = 384px
  
  // Calcular posición horizontal centrada
  let left = cardRect.left + (cardRect.width / 2) - (cardWidth / 2)
  
  // Calcular posición vertical (encima de la tarjeta)
  let top = cardRect.top - 20
  
  // Ajustar si se sale por la derecha
  if (left + cardWidth > window.innerWidth - 20) {
    left = window.innerWidth - cardWidth - 20
  }
  
  // Ajustar si se sale por la izquierda
  if (left < 20) {
    left = 20
  }
  
  // Ajustar si se sale por arriba
  if (top < 20) {
    top = cardRect.bottom + 20 // Mostrar abajo si no cabe arriba
  }
  
  hoverCard.style.left = `${left}px`
  hoverCard.style.top = `${top}px`
}

// Reposicionar en scroll y resize
const handleScrollOrResize = () => {
  checkMobile()
  if (isHovered.value) {
    positionHoverCard()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('scroll', handleScrollOrResize, true)
  window.addEventListener('resize', handleScrollOrResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollOrResize, true)
  window.removeEventListener('resize', handleScrollOrResize)
  clearTimeout(hoverTimer)
})
</script>

<template>
  <!-- class="flex-shrink-0 w-80 cursor-pointer relative" -->
  <div 
    ref="cardRef"
    class="flex-shrink-0 w-full md:w-80 cursor-pointer relative group"
    @mouseenter="showHoverCard"
    @mouseleave="hideHoverCard"
    @click="openModal"
    >

    <!-- Tarjeta Normal -->
    <div class="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <!-- Imagen -->
      <div class="relative aspect-video overflow-hidden bg-gray-800">
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
          :alt="movie.title || movie.name || 'Sin titulo'"
          :class="[
            'w-full h-full object-cover transition-all duration-500 ease-out',
            isCardHovered && !isMobile ? 'scale-110' : 'scale-100'
          ]"
          loading="lazy"
        />

        <!-- Gradient Overlay (siempre visible en mobile) -->
        <div 
          :class="[
            'absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300',
            'md:opacity-0 md:group-hover:opacity-100'
          ]"
        />

        <!-- Info Overlay (Mobile) -->
        <div class="md:hidden absolute bottom-0 left-0 right-0 p-3 space-y-2">
          <h3 class="text-white font-bold text-sm line-clamp-1">
            {{ movie.title || movie.name || 'Sin titulo' }}
          </h3>
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="bg-green-500/80 backdrop-blur-sm text-white px-2 py-0.5 rounded font-bold">
                {{ Math.round(movie.vote_average * 10) }}%
              </span>
              <span class="text-gray-200">
                {{ new Date(movie.release_date || movie.first_air_date).getFullYear() }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-white font-semibold">{{ movie.vote_average?.toFixed(1) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Info (Below Image) -->
      <!-- <div class="hidden md:block p-3 bg-zinc-900/50 backdrop-blur-sm">
        <h3 class="text-white font-semibold text-sm line-clamp-1 mb-1">
          {{ movie.title || movie.name || 'Sin titulo' }}
        </h3>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span>{{ new Date(movie.release_date || movie.first_air_date).getFullYear() }}</span>
          <div class="flex items-center gap-1">
            <svg class="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-white font-semibold">{{ movie.vote_average?.toFixed(1) }}</span>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Tarjeta Hover usando Teleport -->
    <Teleport to="body">
      <transition name="hover-card" appear>
      <div 
        v-if="isHovered && !isMobile"
        ref="hoverCardRef"
        class="fixed w-96 bg-zinc-900 rounded-lg drop-shadow-lg drop-shadow-stone-950 z-[9999] overflow-hidden"
        @mouseenter="keepHoverCard"
        @mouseleave="hideHoverCard"
      >
        <!-- Imagen de la película -->
        <div class="relative overflow-hidden">
          <img 
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
            :alt="movie.title || movie.name || 'Sin titulo'"
            class="w-full h-48 object-cover"
          />
        </div>
        
        <!-- Contenido -->
        <div class="p-4">
          <!-- Botones de acción -->
          <div class="flex items-center gap-2">
            <button class="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-md">
              <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button class="border-2 border-gray-400 text-white w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200 hover:scale-110">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
            <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
            </button>
            <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/>
              </svg>
            </button>

            <div class="ml-auto">
                <button 
                  @click="openModal"
                  class="border-2 border-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-200 hover:scale-110 hover:rotate-180"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 transition-transform duration-200">
                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
          </div>

          <!-- Información de match y metadatos -->
           <div class="mt-3">
              <p class="text-green-400 font-bold text-lg mb-2">
                {{ Math.round(movie.vote_average * 10) }}% Match
              </p>
              <div class="flex items-center gap-3 text-sm">
                <span class="border border-gray-600 text-white px-2 py-1 text-xs rounded">16+</span>
                <span class="text-white">{{ new Date(movie.release_date || movie.first_air_date).getFullYear() }}</span>
                <span class="border border-gray-600 text-white px-2 py-1 text-xs rounded">HD</span>
              </div>
            </div>

          <!-- Categorías -->
          <div class="animate-slide-in-up mt-3" style="animation-delay: 0.2s;">
            <div class="flex flex-wrap gap-1 text-sm text-white">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs transition-colors duration-200 hover:bg-gray-600">Inusual</span>
              <span class="bg-gray-700 px-2 py-1 rounded text-xs transition-colors duration-200 hover:bg-gray-600">Irreverente</span>
              <span class="bg-gray-700 px-2 py-1 rounded text-xs transition-colors duration-200 hover:bg-gray-600">Terror</span>
            </div>
          </div>

          <!-- Me gusta -->
          <!-- <div class="flex items-center gap-2 mb-3">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="text-white text-sm">Con más «Me gusta»</span>
            </div>
          </div> -->

          <!-- Título -->
          <!-- <h3 class="text-white font-bold text-lg mb-3">{{ movie.title }}</h3> -->
          
          
        </div>
      </div>
      
      </transition>
    </Teleport>
    
    <Transition name="modal">
      <MovieModal
      v-if="showModal"
      :movie="movie" 
      :is-open="showModal" 
      @close="closeModal" 
      />
    </Transition>
  
  </div>
</template>

<style scoped>

line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hover card transition */
.hover-card-enter-active {
  animation: fadeInScale 0.25s ease-out;
}

.hover-card-leave-active {
  animation: fadeInScale 0.2s ease-in reverse;
}

/* Modal transition */
.modal-enter-active {
  animation: fadeInScale 0.3s ease-out;
}

.modal-leave-active {
  animation: fadeInScale 0.25s ease-in reverse;
}

/* Aspect ratio fallback */
.aspect-video {
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 16 / 9) {
  .aspect-video {
    padding-bottom: 56.25%;
    position: relative;
  }
  
  .aspect-video img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

</style>