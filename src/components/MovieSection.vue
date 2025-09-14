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