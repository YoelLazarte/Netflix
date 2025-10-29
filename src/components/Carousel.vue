<script setup>
import { ref, onMounted } from "vue"
import MovieCard from "./MovieCard.vue"

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
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false,
  }
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

</script>

<template>
  <section class="py-6 pb-12">
    <!-- Título -->
    <h3 class="text-xl md:text-2xl font-semibold mb-2 md:mb-6 text-white">
      {{ title }}
      <span v-if="showArrow" class="text-blue-400 cursor-pointer hover:underline ml-2">›</span>
    </h3>

    <!-- Carrusel -->
    <div class="relative group">
      <!-- Botón izquierdo -->
      <button 
        @click="scrollLeft"
        class="absolute hidden md:flex left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-3 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
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

      <!-- Loading state -->
      <div v-if="loading" class="flex gap-4">
        <div 
          v-for="i in 5" 
          :key="`skeleton-${i}`"
          class="flex-shrink-0 w-72 h-40 bg-gray-700 rounded-lg animate-pulse"
        />
      </div>

      <!-- Empty state -->
      <div v-else-if="items.length === 0" class="flex items-center justify-center w-full h-40 text-gray-400">
        <p>No hay elementos disponibles</p>
      </div>

        <MovieCard 
          v-else
          v-for="(item, index) in items" 
          :key="item.id" 
          :movie="item"
          :index="index"
          style="scroll-snap-align: start;"
        />

      </div>

      <!-- Botón derecho -->
      <button 
        @click="scrollRight"
        class="absolute hidden md:flex right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-3 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clip-rule="evenodd" />
        </svg>
      </button>

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