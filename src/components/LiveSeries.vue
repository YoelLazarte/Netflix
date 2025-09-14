<!-- <script setup>
import { onMounted, ref } from 'vue';

const movies = ref([]);
const Api_Key = '3af1e6d036ffa8ef56dbfe8b3ffe931e';

defineProps({
  title: {
    type: String,
    required: true,
  },
  showArrow: {
    type: Boolean,
    default: false, // Para secciones tipo "Continuar viendo contenido de Yoel ›"
  },
})

onMounted(async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?language=es-ES&api_key=${Api_Key}`);
    const data = await res.json()
    // Solo las 10 mejores
    movies.value = data.results.slice(0, 10)
  } catch (error) {
    console.error("Error al cargar películas:", error)
  }
})

</script>

<template>

 <section class="px-15 py-6">
    <h3 class="text-2xl font-semibold mb-4">
      {{ title }}
      <span v-if="showArrow" class="text-blue-400 cursor-pointer hover:underline">›</span>
    </h3>

    <div class="flex space-x-4 overflow-x-scroll scrollbar-hide">
      <div 
        v-for="movie in movies" 
        :key="movie.id"
        class="flex-shrink-0 w-80 cursor-pointer transform hover:scale-105 transition duration-300"
      >
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
          :alt="movie.name" 
          class="rounded"
        />
        <p v-if="movie.label" class="text-xs mt-1 bg-red-600 px-2 py-0.5 rounded inline-block">
          {{ movie.label }}
        </p>
      </div>
    </div>
  </section>

</template>

 -->


<script setup>
import MovieCarousel from './Carousel.vue'

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
</script>

<template>
  <MovieCarousel :title="title" :show-arrow="showArrow" />
</template>
