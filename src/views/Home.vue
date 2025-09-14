<script setup>
// import { onMounted, ref } from "vue";
import MoviesSection from "../components/MovieSection.vue";
import TopBestMovies from "../components/TopBestMovies.vue";
import LiveSeries from "../components/LiveSeries.vue";

</script>

<!-- DANDANDAN      https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABa_NGd61b5f642KhlPlVnJrmg79Ofe7pneUJRPWS0mv0KlDy9WYaJQ6nnrJLhPoRne5M8-E3-Y9Zqn_fZYN8Q4HqYmAIucmuJiJP.jpg?r=399 
                    Dos adolescentes deciden probar si los fantasmas o los álienes existen y terminan enfrentando aterradoras amenazas paranormales, recibiendo superpoderes y, tal vez, enamorándose.-->

<!-- Vikingos       https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR9Hqbv0e-JROu_oyBn61soaGXNdjpwa3u8S-5JiD0vAqlH1otgStsjTE3rQos-b-Qt4w8vdhixHfplDahOYxWth1F_GMJdxTm5t.jpg?r=cca
                    En esta intensa serie dramática histórica, un jefe vikingo se enfrenta a la política, la familia y la guerra durante la Edad Media. -->

<!-- El marginal    https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABb5wDdSwmk0HNNv5WVjMlsnsqeEGuGHLaUi-XmjY-xqhF8LxgG14jA_fFNyXLn34O4CGHnFTW1X7gVhy8QnbB0-tV7Lb7rLwKdhi.jpg?r=9c2
                    Un expolicía infiltrado intenta desbaratar una banda que opera desde la cárcel, pero antes deberá manejar los códigos del inframundo para sobrevivir. -->

<template>
<section 
  class="relative h-[80vh] bg-cover bg-center flex items-center" 
  style="background-image: url('https://occ-0-7118-185.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR9Hqbv0e-JROu_oyBn61soaGXNdjpwa3u8S-5JiD0vAqlH1otgStsjTE3rQos-b-Qt4w8vdhixHfplDahOYxWth1F_GMJdxTm5t.jpg?r=cca');"
>
  <!-- Gradiente oscuro en la parte inferior -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

  <!-- Contenido -->
  <div class="relative z-10 px-12 max-w-xl">
    <!-- <h2 class="text-5xl font-bold mb-4">El Marginal</h2> -->
     <img src="../../public/vikingos.png" class="w-full" alt="Logo de la series de vikingos">
    <p class="mb-6 text-lg">
      En esta intensa serie dramática histórica, un jefe vikingo se enfrenta a la política, la familia y la guerra durante la Edad Media
    </p>
    <div class="flex space-x-4">
      <button class="bg-white text-black px-10 py-3 rounded cursor-pointer font-semibold flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
          <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>
        <span class="text-lg font-bold">Reproducir</span>
      </button>
      <button class="bg-[#525253] bg-opacity-70 px-6 py-2 rounded cursor-pointer font-semibold flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <span class="text-lg font-bold">Más información</span>
      </button>
    </div>
  </div>
</section>


<div>
  <MoviesSection title="Continuar viendo contenido de Yoel" />
  <TopBestMovies />
  <LiveSeries title="Series mas populares"/>
</div>

</template>