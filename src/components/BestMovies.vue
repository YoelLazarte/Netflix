<script setup>
import { ref, computed } from 'vue'
import MovieModal from './modal/MovieModal.vue'

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Top 10 Películas'
  },
  country: {
    type: String,
    default: 'Argentina'
  }
})

const selectedMovie = ref(null)
const showModal = ref(false)
const hoveredIndex = ref(null)
const carousel = ref(null)

const top10Movies = computed(() => props.movies.slice(0, 10))

const openModal = (movie) => {
  selectedMovie.value = movie
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedMovie.value = null
}

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -400, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 400, behavior: 'smooth' })
  }
}

const getMedalEmoji = (index) => {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return ''
}
</script>

<template>
  <section class="relative py-6 md:py-10 lg:py-14 overflow-hidden">
    <!-- Background Gradient -->
    <!-- <div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div> -->

    <div class="relative z-10">
      <!-- Header -->
      <div class="mb-6 md:mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="absolute inset-0 opacity-50"></div>
              <div class="relative bg-gradient-to-r from-red-600 to-red-700 text-white text-xs md:text-sm font-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-xl">
                🏆 TOP 10
              </div>
            </div>
            <span class="text-gray-400 text-xs md:text-sm font-medium hidden sm:inline">
              {{ country }} 🌎
            </span>
          </div>

          <!-- Navigation Arrows (Desktop) -->
          <div class="hidden md:flex items-center gap-2">
            <button 
              @click="scrollLeft"
              class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              @click="scrollRight"
              class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <h2 class="text-2xl md:text-3xl lg:text-2xl font-semibold text-white mb-2">
          {{ title }}
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="px-4 md:px-8 lg:px-12">
        <div class="flex gap-3 md:gap-4 lg:gap-6 overflow-hidden">
          <div 
            v-for="i in 5" 
            :key="`skeleton-${i}`"
            class="flex-shrink-0 w-40 md:w-52 lg:w-64"
          >
            <div class="aspect-[2/3] bg-gray-800 rounded-2xl animate-pulse"></div>
            <div class="mt-3 h-4 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Movies Carousel -->
      <div v-else class="relative group/carousel">
        <!-- Left Gradient -->
        <!-- <div class="absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div> -->
        <!-- Right Gradient -->
        <!-- <div class="absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div> -->

        <!-- Carousel Container -->
        <div 
          ref="carousel"
          class="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >
          <div
            v-for="(movie, index) in top10Movies"
            :key="movie.id"
            class="flex-shrink-0 w-40 sm:w-44 md:w-52 lg:w-64 xl:w-72 group cursor-pointer"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
            @click="openModal(movie)"
          >
            <!-- Card Container -->
            <div class="relative transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <!-- Main Card -->
              <div class="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                <!-- Poster Image -->
                <img
                  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <!-- Gradient Overlays -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>

                <!-- Top Badges -->
                <div class="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                  <!-- Rank Badge -->
                  <div class="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                    <span class="text-white font-black text-sm md:text-base">#{{ index + 1 }}</span>
                    <span v-if="getMedalEmoji(index)" class="text-lg">{{ getMedalEmoji(index) }}</span>
                  </div>

                  <!-- Rating Badge -->
                  <!-- <div class="bg-yellow-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xl">
                    <svg class="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="text-white font-bold text-xs md:text-sm">{{ movie.vote_average?.toFixed(1) }}</span>
                  </div> -->
                </div>

                <!-- Bottom Info -->
                <div class="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 class="text-white font-bold text-sm md:text-base lg:text-lg line-clamp-2 mb-1.5 md:mb-2 drop-shadow-lg">
                    {{ movie.title }}
                  </h3>
                  <div class="flex items-center justify-between text-xs md:text-sm">
                    <span class="text-gray-300">{{ new Date(movie.release_date).getFullYear() }}</span>
                    <!-- <span class="text-green-400 font-bold">
                      {{ Math.round(movie.vote_average * 10) }}% Match
                    </span> -->
                  </div>
                </div>

                <!-- Hover Overlay -->
                <div 
                  class="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 md:gap-4 transition-all duration-300"
                  :class="hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'"
                >

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2 md:gap-3">
                    <!-- <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </button> -->
                    <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                    <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Genre Tags (Desktop) -->
                  <div class="hidden lg:flex flex-wrap gap-1.5 px-4 justify-center">
                    <span class="bg-white/10 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">Drama</span>
                    <span class="bg-white/10 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">Action</span>
                  </div>
                </div>

                <!-- Hot Badge (Top 3) -->
                <!-- <div 
                  v-if="index < 3"
                  class="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full shadow-xl animate-pulse"
                >
                  🔥 TRENDING
                </div> -->
              </div>

              <!-- Extra Info Card (Below poster - Desktop) -->
              <!-- <div class="hidden md:block mt-3 space-y-2">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-transparent rounded-full"></div>
                </div>
                <div class="text-xs text-gray-400 flex items-center justify-between">
                  <span>Posición {{ index + 1 }}</span>
                  <span class="text-green-400 font-semibold">↑ Subiendo</span>
                </div>
              </div> -->
            </div>
          </div>

          <!-- End Spacer -->
          <!-- <div class="flex-shrink-0 w-4 md:w-8"></div> -->
        </div>

        <!-- Mobile Navigation Arrows -->
        <button 
          @click="scrollLeft"
          class="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-20 shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button 
          @click="scrollRight"
          class="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-20 shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <MovieModal 
      v-if="selectedMovie"
      :movie="selectedMovie" 
      :is-open="showModal" 
      @close="closeModal" 
    />
  </section>
</template>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Smooth scrolling */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>