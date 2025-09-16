<script setup>
import { ref, onMounted } from 'vue'
import MovieCarousel from './Carousel.vue'
import { useTMDB } from '../services/ComposablesTMDB';

const {
  loading,
  getTrendingTVShows
} = useTMDB();

const trendingSeries = ref([])

onMounted(async () => {
  trendingSeries.value = await getTrendingTVShows('day', 15)
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
    :items="trendingSeries" 
    :loading="loading" 
    :show-arrow="showArrow" 
    />
</template>
