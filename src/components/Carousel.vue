<script setup>
import { ref, onMounted } from "vue"
import MovieCard from "./MovieCard.vue"

const movies = ref([])
const liveSeries = ref([])
const Api_Key = '3af1e6d036ffa8ef56dbfe8b3ffe931e'
const carousel = ref(null)

defineProps({
  title: {
    type: String,
    required: true,
  },
  showArrow: {
    type: Boolean,
    default: false,
  },
})

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -400, behavior: "smooth" })
  }
}

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 400, behavior: "smooth" })
  }
}

onMounted(async () => {
  try {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&api_key=${Api_Key}`)
    const data = await resp.json()
    movies.value = data.results.slice(0, 15)
    console.log(movies.value)
  } catch (error) {
    console.error('Error al obtener las peliculas:', error)
  }
});

// onMounted(async () => {
//   try {
//     const resp = await fetch(`https://api.themoviedb.org/3/trending/tv/day?language=es-ES&api_key=${Api_Key}`)
//     const data = await resp.json()
//     liveSeries.value = data.results.slice(0, 15)
//   } catch (error) {
//     console.error('Error al obtener las peliculas:', error)
//   }
// });

</script>

<template>
  <section class="px-15 py-6 pb-12">
    <!-- Título -->
    <h3 class="text-2xl font-semibold mb-6 text-white">
      {{ title }}
      <span v-if="showArrow" class="text-blue-400 cursor-pointer hover:underline ml-2">›</span>
    </h3>

    <!-- Carrusel -->
    <div class="relative group">
      <!-- Botón izquierdo -->
      <button 
        @click="scrollLeft"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-3 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Contenedor del carrusel -->
      <div 
        ref="carousel" 
        class="flex gap-4 overflow-x-auto scrollbar-hide py-2"
      >

      <MovieCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie"
          style="scroll-snap-align: start;"
        />

      </div>

      <!-- Botón derecho -->
      <button 
        @click="scrollRight"
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-3 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Ocultar scroll en el carrusel */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}</style>