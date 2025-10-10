<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useTMDB } from '../../services/ComposablesTMDB.js'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const {
  getContentType,
  getCreditsRes,
  getSimilarData
} = useTMDB()

const emit = defineEmits(['close'])

const movieDetails = ref(null)
const movieCast = ref([])
const similarMovies = ref([])
const loading = ref(false)

const isMovie = computed(() => props.movie.title !== undefined)
const contentTitle = computed(() => isMovie.value ? props.movie.title : props.movie.name)
const releaseDate = computed(() => isMovie.value ? props.movie.release_date : props.movie.first_air_date)
const contentType = computed(() => isMovie.value ? 'movie' : 'tv')
// console.log("valor del contenido", contentType.value,  "||" , "contenido", isMovie.value,  )

const fetchMovieDetails = async () => {
  if (!props.movie?.id) return

  loading.value = true
  try {
    movieDetails.value = await getContentType(contentType.value, props.movie.id);
    const creditsData = await getCreditsRes(contentType.value, props.movie.id); 
    const similarData = await getSimilarData(contentType.value, props.movie.id); 
    
    movieCast.value = creditsData.cast.slice(0, 8);
    similarMovies.value = similarData;
  } catch (error) {
    console.error('Error fetching movie details:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emit('close')
}

const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).getFullYear()
}

const getGenreNames = (genres) => {
  if (!genres) return []
  return genres.map(genre => genre.name)
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    fetchMovieDetails()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

onMounted(() => {
  if (props.isOpen) {
    fetchMovieDetails()
  }
})
</script>

<template>
  <!-- Modal Backdrop -->
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
        @click.self="closeModal"
      >
      <!-- Modal Content -->
      <Transition name="modal-content" appear>
        <div v-if="isOpen" class="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-10 cursor-pointer bg-zinc-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-all duration-200 hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

        <div v-if="loading" class="p-8">
          <div class="animate-pulse space-y-4">
            <div class="h-64 bg-gray-700 rounded"></div>
            <div class="h-8 bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>

        <div v-else-if="movieDetails">
          <!-- Hero Section -->
          <div class="relative">
            <img 
              :src="`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path || movie.backdrop_path}`"
              :alt="contentTitle"
              class="w-full h-64 md:h-80 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
            
            <!-- <div v-if="movieVideos.length > 0" class="absolute inset-0 flex items-center justify-center">
              <button class="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all backdrop-blur-sm">
                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div> -->
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Title and Basic Info -->
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ contentTitle }}</h1>
              <div class="flex items-center gap-4 text-sm text-gray-300">
                <span class="text-green-400 font-semibold">{{ Math.round(movieDetails.vote_average * 10) }}% Match</span>
                <span>{{ formatDate(releaseDate) }}</span>
                <span v-if="movieDetails.runtime">{{ formatRuntime(movieDetails.runtime) }}</span>
                <span v-if="!isMovie && movieDetails.number_of_seasons">
                  {{ movieDetails.number_of_seasons }} temporada{{ movieDetails.number_of_seasons !== 1 ? 's' : '' }}
                </span>
                <span class="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <button class="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Reproducir
              </button>
              <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </button>
              <button class="border-2 border-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
              </button>
            </div>

            <!-- Description -->
            <div>
              <p class="text-gray-300 text-lg leading-relaxed">
                {{ movieDetails.overview || movie.overview || 'Sin descripción disponible.' }}
              </p>
            </div>

            <!-- Two Column Layout -->
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Left Column - Main Info -->
              <div class="md:col-span-2 space-y-6">
                <!-- Cast -->
                <div v-if="movieCast.length > 0">
                  <h3 class="text-white font-semibold text-lg mb-3">Reparto</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="actor in movieCast" :key="actor.id" class="text-center">
                      <img 
                        v-if="actor.profile_path"
                        :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                        :alt="actor.name"
                        class="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <div v-else class="w-full h-24 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <p class="text-white text-sm font-medium">{{ actor.name }}</p>
                      <p class="text-gray-400 text-xs">{{ actor.character }}</p>
                    </div>
                  </div>
                </div>

                <!-- Similar Content -->
                <div v-if="similarMovies.length > 0">
                  <h3 class="text-white font-semibold text-lg mb-3">Contenido similar</h3>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="similar in similarMovies" :key="similar.id" class="bg-zinc-800 rounded-lg overflow-hidden">
                      <img 
                        :src="`https://image.tmdb.org/t/p/w300${similar.backdrop_path}`"
                        :alt="similar.title || similar.name"
                        class="w-full h-32 object-cover"
                      />
                      <div class="p-3">
                        <h4 class="text-white font-medium text-sm mb-1">{{ similar.title || similar.name }}</h4>
                        <p class="text-gray-400 text-xs line-clamp-2">{{ similar.overview }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Details -->
              <div class="space-y-4 text-sm">
                <!-- Genres -->
                <div v-if="movieDetails.genres">
                  <span class="text-gray-400">Géneros: </span>
                  <span class="text-white">{{ getGenreNames(movieDetails.genres).join(', ') }}</span>
                </div>

                <!-- Release Date -->
                <div>
                  <span class="text-gray-400">{{ isMovie ? 'Fecha de estreno' : 'Primera emisión' }}: </span>
                  <span class="text-white">{{ formatDate(releaseDate) }}</span>
                </div>

                <!-- Rating -->
                <div>
                  <span class="text-gray-400">Calificación: </span>
                  <span class="text-white">{{ movieDetails.vote_average?.toFixed(1) }}/10</span>
                </div>

                <!-- Runtime or Seasons -->
                <div v-if="isMovie && movieDetails.runtime">
                  <span class="text-gray-400">Duración: </span>
                  <span class="text-white">{{ formatRuntime(movieDetails.runtime) }}</span>
                </div>
                <div v-else-if="!isMovie && movieDetails.number_of_seasons">
                  <span class="text-gray-400">Temporadas: </span>
                  <span class="text-white">{{ movieDetails.number_of_seasons }}</span>
                </div>

                <!-- Production Countries -->
                <div v-if="movieDetails.production_countries?.length">
                  <span class="text-gray-400">País: </span>
                  <span class="text-white">{{ movieDetails.production_countries.map(c => c.name).join(', ') }}</span>
                </div>

                <!-- Original Language -->
                <div v-if="movieDetails.original_language">
                  <span class="text-gray-400">Idioma original: </span>
                  <span class="text-white">{{ movieDetails.original_language.toUpperCase() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </Transition>
    </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animaciones del modal */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease;
}

.modal-content-leave-active {
  transition: all 0.25s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(50px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>