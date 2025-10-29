<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '../router/router'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isSearchOpen = ref(false)
const activeTab = ref('inicio')

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: 'home', route: '/' },
  { id: 'series', label: 'Series', icon: 'tv', route: '/series' },
  { id: 'peliculas', label: 'Películas', icon: 'film', route: '/peliculas' },
  { id: 'nuevas', label: 'Nuevas', icon: 'sparkles', route: '/nuevas' },
  { id: 'lista', label: 'Mi Lista', icon: 'bookmark', route: '/favoritos' },
  { id: 'explorar', label: 'Explorar', icon: 'globe', route: '/explorar' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

const setActiveTab = (id) => {
  activeTab.value = id
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Desktop Navbar -->
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'
    ]"
  >
    <div class="hidden lg:block">
      <div class="px-6 xl:px-12 py-4">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-6">
          <!-- Logo -->
          <div class="flex items-center gap-8">
            <img src="/logo.png" class="h-12 xl:h-14 w-auto" alt="Netflix Logo" />
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-4">
            <!-- Search -->
            <div class="relative">
              <button 
                @click="toggleSearch"
                class="text-white hover:text-gray-300 transition-colors p-2"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
              
              <!-- Search Dropdown -->
              <Transition name="search">
                <div 
                  v-if="isSearchOpen"
                  class="absolute right-0 top-12 w-80 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-800"
                >
                  <input 
                    type="text"
                    placeholder="Buscar títulos, personas, géneros..."
                    class="w-full bg-gray-900 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-600"
                    autofocus
                  />
                </div>
              </Transition>
            </div>

            <!-- Notifications -->
            <button class="text-white hover:text-gray-300 transition-colors p-2 relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            <!-- Profile -->
            <div class="flex items-center gap-3 bg-gray-900/50 pl-3 pr-2 py-2 rounded-full hover:bg-gray-800/50 transition-colors cursor-pointer">
              <span class="text-white text-sm font-medium hidden xl:block">Usuario</span>
              <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full ring-2 ring-gray-700" alt="profile" />
            </div>
          </div>
        </div>

        <!-- Navigation Pills (Estilo TV) -->
        <nav class="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
          <router-link
            v-for="item in menuItems"   
            :key="item.id" 
            :to="item.route"
            @click="setActiveTab(item.id)" 
            :class="[
              'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap',
              activeTab === item.id 
                ? 'bg-white text-black shadow-lg scale-105' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
            ]"
          >
            <!-- Icons -->
            <svg v-if="item.icon === 'home'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <svg v-else-if="item.icon === 'tv'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
            </svg>
            <svg v-else-if="item.icon === 'film'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
            <svg v-else-if="item.icon === 'sparkles'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24l2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z"/>
            </svg>
            <svg v-else-if="item.icon === 'bookmark'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <svg v-else-if="item.icon === 'globe'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
            </svg>
            
            {{ item.label }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Mobile Navbar (Clásico mejorado) -->
    <div class="lg:hidden">
      <div class="flex items-center justify-between px-4 py-3">
        <!-- Logo -->
        <img src="/logo.png" class="h-10 w-auto" alt="Netflix Logo" />

        <!-- Mobile Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button 
            @click="toggleSearch"
            class="text-white p-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          <!-- Menu Burger -->
          <button 
            @click="toggleMenu"
            class="text-white p-2"
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <Transition name="slide-down">
        <div v-if="isSearchOpen" class="px-4 pb-3">
          <input 
            type="text"
            placeholder="Buscar..."
            class="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </Transition>

      <!-- Mobile Menu Dropdown -->
      <Transition name="slide-down">
        <div 
          v-if="isMenuOpen"
          class="absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-t border-gray-800 shadow-2xl"
        >
          <nav class="px-4 py-6 space-y-1">
            <router-link
              v-for="item in menuItems"
              :key="item.id"
              :to="item.route"
              @click="setActiveTab(item.id)"
              :class="[
                'flex items-center gap-4 px-4 py-3 rounded-lg transition-all',
                activeTab === item.id 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              ]"
            >
              <!-- Icons (same as desktop) -->
              <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <svg v-else-if="item.icon === 'tv'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
              </svg>
              <svg v-else-if="item.icon === 'film'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              <svg v-else-if="item.icon === 'sparkles'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24l2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z"/>
              </svg>
              <svg v-else-if="item.icon === 'bookmark'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
              <svg v-else-if="item.icon === 'globe'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
              </svg>
              
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </nav>

          <!-- Profile Section -->
          <div class="px-4 py-4 border-t border-gray-800">
            <div class="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
              <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full ring-2 ring-gray-700" alt="profile" />
              <div class="flex-1">
                <p class="text-white font-semibold text-sm">Usuario</p>
                <p class="text-gray-400 text-xs">Ver perfil</p>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Hide scrollbar for navigation pills */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Search transition */
.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Slide down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>