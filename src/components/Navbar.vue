<script setup>
// En el futuro, aquí puedes manejar el estado del buscador
</script>

<template>

    <header class="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black fixed w-full z-50">
      <!-- Logo -->
      <div class="flex items-center space-x-8">
        <img src="../../public/logo.png" class="w-32 h-16" alt="">
        <!-- <h1 class="text-red-600 text-3xl font-bold">NETFLIX</h1> -->
        <nav class="hidden md:flex space-x-6 text-sm">
          <router-link to="/" class="hover:text-gray-300">Inicio</router-link>
          <router-link to="/" class="hover:text-gray-300">Series</router-link>
          <router-link to="/" class="hover:text-gray-300">Películas</router-link>
          <router-link to="/" class="hover:text-gray-300">Juegos</router-link>
          <router-link to="/" class="hover:text-gray-300">Novedades populares</router-link>
          <router-link to="/favoritos" class="hover:text-gray-300">Mi lista</router-link>
          <router-link to="/" class="hover:text-gray-300">Explora por idiomas</router-link>
        </nav>
      </div>
      <!-- Opciones -->
      <div class="flex items-center space-x-4">

<div
  class="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
>
  <div class="flex items-center justify-center fill-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Isolation_Mode"
      data-name="Isolation Mode"
      viewBox="0 0 24 24"
      width="22"
      height="22"
    >
      <path
        d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
      ></path>
    </svg>
  </div>
  <input
    type="text"
    class="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
  />
</div>
      

        <button><i class="fas fa-search"></i></button>
        <button class="text-sm">Niños</button>
        <button><i class="fas fa-bell"></i></button>
        <img src="https://i.pravatar.cc/30" class="rounded w-8 h-8" alt="profile"/>
      </div>
    </header>


    <!-- <nav class="bg-black">
    <div class="container mx-auto px-4 flex items-center justify-between flex-wrap">
      <router-link to="/">
        <img src="" alt="Netflix" class="w-32 h-16" />
      </router-link>

      <button class="text-white inline-block lg:hidden" type="button">
        <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">Home</router-link>
          <router-link to="/favoritos" class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">Favoritos</router-link>
        </div>

        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg class="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M22 22L20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>
          <input type="text" class="py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md focus:outline-none focus:bg-gray-700" placeholder="Buscar.." />
        </div>
      </div>
    </div>
  </nav> -->
</template>