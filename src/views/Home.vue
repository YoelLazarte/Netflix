<script setup>
// import { onMounted, ref } from "vue";
import MoviesSection from "../components/MovieSection.vue";
import TopBestMovies from "../components/TopBestMovies.vue";
import LiveSeries from "../components/LiveSeries.vue";
import RatedMovies from "../components/RatedMovies.vue";


import { ref } from 'vue'

const props = defineProps({
  userId: {
    type: String,
    default: 'Hariharan'
  },
  featuredContent: {
    type: Object,
    default: () => ({
      title: 'SELLING SUNSET',
      subtitle: 'SEASON 4',
      description: 'Big Listings. Big Personalities.',
      image: '/path-to-image.jpg',
      year: '2024',
      rating: '8.5',
      badge: 'A NETFLIX REALITY SERIES'
    })
  }
})

const activeTab = ref('tv')

const tabs = [
  { id: 'tv', label: 'TV Shows' },
  { id: 'movies', label: 'Movies' },
  { id: 'categories', label: 'Categories', hasDropdown: true }
]

const changeTab = (tabId) => {
  if (tabId !== 'categories') {
    activeTab.value = tabId
  }
}

</script>

<!-- DANDANDAN      https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABa_NGd61b5f642KhlPlVnJrmg79Ofe7pneUJRPWS0mv0KlDy9WYaJQ6nnrJLhPoRne5M8-E3-Y9Zqn_fZYN8Q4HqYmAIucmuJiJP.jpg?r=399 
                    Dos adolescentes deciden probar si los fantasmas o los álienes existen y terminan enfrentando aterradoras amenazas paranormales, recibiendo superpoderes y, tal vez, enamorándose.-->

<!-- Vikingos       https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR9Hqbv0e-JROu_oyBn61soaGXNdjpwa3u8S-5JiD0vAqlH1otgStsjTE3rQos-b-Qt4w8vdhixHfplDahOYxWth1F_GMJdxTm5t.jpg?r=cca
                    En esta intensa serie dramática histórica, un jefe vikingo se enfrenta a la política, la familia y la guerra durante la Edad Media. -->

<!-- El marginal    https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABb5wDdSwmk0HNNv5WVjMlsnsqeEGuGHLaUi-XmjY-xqhF8LxgG14jA_fFNyXLn34O4CGHnFTW1X7gVhy8QnbB0-tV7Lb7rLwKdhi.jpg?r=9c2
                    Un expolicía infiltrado intenta desbaratar una banda que opera desde la cárcel, pero antes deberá manejar los códigos del inframundo para sobrevivir. -->


                    
<template>

  <section class="relative md:hidden w-full h-screen md:px-10 bg-black overflow-hidden">
    <!-- Background Image with Gradient -->
    <div class="absolute inset-0">
      <div class="relative w-full h-full">
        <!-- Placeholder para la imagen - reemplaza con tu imagen real -->
        <!-- <div class="w-full h-full bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700">
          <img :src="featuredContent.image" class="w-full h-full object-cover" />
        </div> -->
        
        <!-- Gradients overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
        <!-- Background con el fondo gris -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-zinc-900/20 to-transparent"></div>
      </div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 h-9/10 flex mt-15">

      <!-- Header Section -->
      <!-- <div class="px-4 md:px-6 pt-12 md:pt-16 pb-6">
        <div class="flex items-center gap-2 md:gap-3">
          <a class="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 bg-gray-800/80 text-white hover:bg-gray-700/80 backdrop-blur-sm">Inicio</a>

          <select 
            name="" 
            id="" 
            class="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 bg-gray-800/80 text-white hover:bg-gray-700/80 backdrop-blur-sm">
            <option value="">Tv Shows</option>
            <option value="">Hola2</option>
            <option value="">Hola23</option>
          </select>

          <select 
            name="" 
            id="" 
            class="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 bg-gray-800/80 text-white hover:bg-gray-700/80 backdrop-blur-sm">
            <option value="">Movies</option>
            <option value="">Hola2</option>
            <option value="">Hola23</option>
          </select> 
        </div>
      </div> -->
      
      
      <!-- Main Content Area -->
      <div 
        class="flex-1 flex flex-col justify-end bg-cover bg-center mx-5 px-4 md:px-6 pb-8 md:pb-12 rounded-lg border-gray-500 border-2 "
        style="background-image: url('https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR9Hqbv0e-JROu_oyBn61soaGXNdjpwa3u8S-5JiD0vAqlH1otgStsjTE3rQos-b-Qt4w8vdhixHfplDahOYxWth1F_GMJdxTm5t.jpg?r=cca'); "
      >
        <div class="max-w-lg space-y-4 md:space-y-6">
          <!-- Series Badge -->
          <div class="flex items-center gap-2">
            <span class="text-blue-400 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
              {{ featuredContent.badge }}
            </span>
          </div>

          <!-- Title -->
          <div class="space-y-1 md:space-y-2">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              VIKINGOS
            </h2>
            
            <!-- Subtitle -->
            <p class="text-xl md:text-2xl text-gray-300 font-light tracking-widest">
              {{ featuredContent.subtitle }}
            </p>
          </div>

          <!-- Description -->
          <p class="text-base md:text-lg text-gray-200 font-medium tracking-wide">
            {{ featuredContent.description }}
          </p>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
            <!-- Play Button -->
            <button class="bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-2.5 md:py-3 rounded-md md:rounded-lg font-semibold flex items-center gap-2 md:gap-3 transition-all duration-200 hover:scale-105 shadow-lg text-sm md:text-base">
              <svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>

            <!-- My List Button -->
            <button class="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm text-white px-4 md:px-6 py-2.5 md:py-3 rounded-md md:rounded-lg font-semibold flex items-center gap-2 md:gap-3 transition-all duration-200 hover:scale-105 border border-gray-600/50 text-sm md:text-base">
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Mi Lista
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator (solo en desktop) -->
      <div class="hidden md:block absolute bottom-6 right-6 animate-bounce">
        <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </div>
    
  </section>

  
  <section 
    class="relative h-[80vh] bg-cover bg-center hidden md:flex items-center " 
    style="background-image: url('https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR9Hqbv0e-JROu_oyBn61soaGXNdjpwa3u8S-5JiD0vAqlH1otgStsjTE3rQos-b-Qt4w8vdhixHfplDahOYxWth1F_GMJdxTm5t.jpg?r=cca');"
  >
  
   <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-zinc-900/20 to-transparent"></div>
  
    <!-- Contenido -->
    <div class="relative z-10 px-12 max-w-xl">
       <img src="../../public/vikingos.png" class="w-full" alt="Logo de la series de vikingos">
      <p class="mb-6 text-lg text-center md:text-start">
        En esta intensa serie dramática histórica, un jefe vikingo se enfrenta a la política, la familia y la guerra durante la Edad Media
      </p>
      <div class="flex gap-4 aling-center justify-center md:justify-start">
        <button class="bg-white text-black px-5 py-1 md:px-10 md:py-3 rounded cursor-pointer font-semibold flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
          </svg>
          <span class="md:text-lg font-bold">Play</span>
        </button>
        <button class="bg-[#525253] bg-opacity-70 px-6 py-2 rounded cursor-pointer font-semibold hidden md:flex items-center space-x-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span class="text-lg font-bold">Más información</span>
        </button>
      </div>
    </div>

  </section> 
  
  
  <section class="px-5 md:px-10">
    <MoviesSection title="Continuar viendo contenido de Yoel" />
    <TopBestMovies />
    <LiveSeries title="Series más populares"/>
    <RatedMovies title="Películas mejor calificadas"/>
  </section>

</template>