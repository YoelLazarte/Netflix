<script setup>
import Navbar from './components/Navbar.vue';


</script>

<template>
  <div class="bg-[#141414] min-h-screen text-white">
    <!-- La barra de navegación se mostrará en todas las páginas -->
    <Navbar />
    <main>
      <router-view />
      <!-- router-view es el marcador de posición donde Vue Router
           renderizará el componente de la ruta actual (HomeView, FavoritosView, etc.) -->
    </main>
    
  </div>
</template>


