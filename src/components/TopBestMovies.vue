<script setup>
import { ref, onMounted } from "vue"

const movies = ref([])
const Api_Key = '3af1e6d036ffa8ef56dbfe8b3ffe931e';

onMounted(async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1&api_key=${Api_Key}`);
    const data = await res.json()
    // Solo las 10 mejores
    movies.value = data.results.slice(0, 10)
  } catch (error) {
    console.error("Error al cargar películas:", error)
  }
})
</script>

<style>
/* Ocultar scroll en el carrusel */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<template>
  <section class="text-white px-15 py-6">
    <h2 class="text-2xl font-bold mb-6">
      Las 10 películas más populares del Momento
    </h2>
    <div class="flex space-x-6 overflow-x-auto px-15 no-scrollbar">
      <div
        v-for="(movie, index) in movies"
        :key="movie.id"
        class="relative flex-shrink-0 w-40 md:w-40 mx-10 cursor-pointer"
      >
        <!-- Número gigante detrás -->
        <span
          class="absolute -left-15 top-1/2 -translate-y-1/2 text-[10rem] font-extrabold text-stone-600 opacity-40 select-none"
        >
          {{ index + 1 }}
        </span>

        <!-- Poster de la película -->
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="relative z-10 w-full h-auto rounded-md shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

