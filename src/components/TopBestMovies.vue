<script setup>
import { ref, onMounted } from 'vue'
// import MovieCarousel from './Carousel.vue'
import BestMovies from './BestMovies.vue'
import { useTMDB } from '../services/ComposablesTMDB.js'

const { loading, getPopularMovies } = useTMDB()

const popularMovies = ref([])

onMounted(async () => {
  popularMovies.value = await getPopularMovies(10) // Solo necesitas 10
})
</script>

<template>
  <div class="">
    <!-- Top 10 Section -->
    <BestMovies 
      :movies="popularMovies"
      :loading="loading"
      title="Top 10 Películas en Argentina"
      country="Argentina"
    />

    <!-- También puedes crear múltiples secciones -->
    <!-- <Top10Movies 
      :movies="topTVShows"
      :loading="loading"
      title="Top 10 Series en Argentina"
      country="Argentina"
    /> -->
  </div>
</template>