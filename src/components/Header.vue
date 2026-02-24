<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const isOpen = ref(false);
const scrolled = ref(false);

const navLinks = [
  { name: 'Inicio', href: '#home' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Horarios', href: '#schedule' },
  { name: 'Beneficios', href: '#benefits' },
  { name: 'Instructores', href: '#instructors' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      scrolled 
        ? 'bg-black/90 backdrop-blur-md py-3 border-b border-red-900/30' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="Team Cabrera Logo" class="w-8 h-8 object-contain">
          <span class="text-xl font-black tracking-tighter uppercase italic">
            TEAM <span class="text-red-600">CABRERA</span>
          </span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <a 
            v-for="link of navLinks" 
            :key="link.name" 
            :href="link.href" 
            class="text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            {{ link.name }}
          </a>
        </nav>

        <div class="hidden md:block">
          <a 
            href="#contact" 
            class="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(185,28,28,0.4)]"
          >
            Sumate Hoy
          </a>
        </div>

        <div class="md:hidden">
          <button @click="toggleMenu" class="text-white p-2">
            <X v-if="isOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full h-screen"
      >
        <nav class="flex flex-col items-center justify-center h-2/3 space-y-8">
          <a 
            v-for="link of navLinks" 
            :key="link.name" 
            :href="link.href" 
            @click="closeMenu" 
            class="text-2xl font-black uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            {{ link.name }}
          </a>
          <a 
            href="#contact" 
            @click="closeMenu" 
            class="bg-red-700 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest"
          >
            Sumate Hoy
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>