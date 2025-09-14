<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const cardRef = ref(null)
const hoverCardRef = ref(null)
let hoverTimer = null

const showHoverCard = () => {
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(async () => {
    isHovered.value = true
    // Esperar a que el DOM se actualice antes de posicionar
    await nextTick()
    positionHoverCard()
  }, 500)
}

const hideHoverCard = () => {
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    isHovered.value = false
  }, 300)
}

const keepHoverCard = () => {
  clearTimeout(hoverTimer)
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
  if (isHovered.value) {
    positionHoverCard()
  }
}

onMounted(() => {
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
  <div 
    ref="cardRef"
    class="flex-shrink-0 w-80 cursor-pointer relative"
    @mouseenter="showHoverCard"
    @mouseleave="hideHoverCard"
  >
    <!-- Tarjeta Normal -->
    <img 
      :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
      :alt="movie.title"
      class="w-full h-40 object-cover rounded-lg transition-transform duration-200"
    />

    <!-- Tarjeta Hover usando Teleport -->
    <Teleport to="body">
      <div 
        v-if="isHovered"
        ref="hoverCardRef"
        class="fixed w-96 bg-zinc-900 rounded-lg drop-shadow-lg drop-shadow-stone-950 z-[9999] overflow-hidden"
        @mouseenter="keepHoverCard"
        @mouseleave="hideHoverCard"
        style="animation: fadeInScale 0.2s ease-out forwards;"
      >
        <!-- Imagen de la película -->
        <div class="relative">
          <img 
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
            :alt="movie.title"
            class="w-full h-48 object-cover"
          />
        </div>
        
        <!-- Contenido -->
        <div class="p-4">
          <!-- Botones de acción -->
          <div class="flex items-center gap-2 mb-4">
            <button class="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
            <!-- <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
            </button>
            <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7"/>
              </svg>
            </button> -->
            
            <!-- Badge HD -->
            <div class="ml-auto">
              <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
              </button>
              <!-- <span class="text-white text-sm font-semibold">HD</span> -->
            </div>
          </div>

          <!-- Información de match y metadatos -->
          <div class="mb-3">
            <p class="text-green-400 font-bold text-lg mb-2">
              {{ Math.round(movie.vote_average * 10) }}% Match
            </p>
            <div class="flex items-center gap-3 text-sm">
              <span class="border border-gray-400 text-white px-2 py-1 text-xs">16+</span>
              <span class="text-white">{{ new Date(movie.release_date).getFullYear() }}</span>
              <span class="border border-gray-400 text-white px-2 py-1 text-xs">HD</span>
            </div>
          </div>

          <!-- Categorías -->
          <!-- <div class="mb-3">
            <div class="flex flex-wrap gap-1 text-sm text-white">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">{{ movie.genre_ids[0] }}</span>
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">Irreverente</span>
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">Terror</span>
            </div>
          </div> -->

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
          <h3 class="text-white font-bold text-lg mb-3">{{ movie.title }}</h3>
          
          <!-- Descripción -->
          <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {{ movie.overview || 'Sin descripción disponible' }}
          </p>
          
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* .line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */
</style>