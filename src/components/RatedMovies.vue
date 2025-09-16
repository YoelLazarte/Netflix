<script setup>
import { ref, onMounted } from 'vue'
import MovieCarousel from './Carousel.vue'
import { useTMDB } from '../services/ComposablesTMDB';

const {
  loading,
  getTopRatedMovies
} = useTMDB();

const ratedMovies = ref([])

onMounted(async () => {
  ratedMovies.value = await getTopRatedMovies();
})

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
    <MovieCarousel 
    :title="title"
    :items="ratedMovies" 
    :loading="loading" 
    :show-arrow="showArrow" 
    />
</template>