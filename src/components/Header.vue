<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const isOpen = ref(false);
const scrolled = ref(false);
const mounted = ref(false);
const activeSection = ref('home');

const navLinks = [
  { name: 'Inicio',       href: '#home' },
  { name: 'Nosotros',     href: '#about' },
  { name: 'Horarios',     href: '#schedule' },
  { name: 'Beneficios',   href: '#benefits' },
  { name: 'Instructores', href: '#instructors' },
  { name: 'Galería',      href: '#gallery' },
  { name: 'Contacto',     href: '#contact' },
];

const toggleMenu = () => { isOpen.value = !isOpen.value; };
const closeMenu  = () => { isOpen.value = false; };

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;

  // Detectar sección activa
  const sections = navLinks.map(l => l.href.replace('#', ''));
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i]);
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = sections[i];
      break;
    }
  }
};

onMounted(() => {
  setTimeout(() => { mounted.value = true; }, 80);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    :class="[
      'fixed w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-black/90 backdrop-blur-md py-3 border-b border-red-900/30'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">

        <!-- Logo — entra desde la izquierda -->
        <div
          class="flex items-center gap-2 transition-all duration-700 ease-out"
          :class="mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'"
          style="transition-delay: 100ms;"
        >
          <img
            src="/src/assets/imagenes/logo.png"
            alt="Team Cabrera Logo"
            class="w-8 h-8 object-contain hover:scale-110 hover:rotate-6 transition-transform duration-300"
          />
          <span class="text-xl font-black tracking-tighter uppercase italic">
            TEAM <span class="text-red-600">CABRERA</span>
          </span>
        </div>

        <!-- Nav desktop — entra desde arriba con stagger -->
        <nav class="hidden md:flex space-x-8">
          <a
            v-for="(link, i) in navLinks"
            :key="link.name"
            :href="link.href"
            class="relative text-sm font-bold uppercase tracking-widest transition-colors duration-300 group"
            :class="[
              activeSection === link.href.replace('#','')
                ? 'text-red-600'
                : 'hover:text-red-600',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            ]"
            :style="{ transition: `opacity 500ms ease-out ${100 + i * 60}ms, transform 500ms ease-out ${100 + i * 60}ms, color 300ms` }"
          >
            {{ link.name }}
            <!-- Línea inferior activa/hover -->
            <span
              class="absolute -bottom-1 left-0 h-px bg-red-600 transition-all duration-300 ease-out"
              :class="activeSection === link.href.replace('#','') ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </a>
        </nav>

        <!-- Botón CTA — entra desde la derecha -->
        <div
          class="hidden md:block transition-all duration-700 ease-out"
          :class="mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'"
          style="transition-delay: 550ms;"
        >
          <a
            href="#contact"
            class="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:shadow-[0_0_25px_rgba(185,28,28,0.6)]"
          >
            Sumate Hoy
          </a>
        </div>

        <!-- Hamburger mobile -->
        <div
          class="md:hidden transition-all duration-700 ease-out"
          :class="mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'"
          style="transition-delay: 300ms;"
        >
          <button
            @click="toggleMenu"
            class="text-white p-2 hover:text-red-600 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 rotate-90 scale-75"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-active-class="transition-all duration-200"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 -rotate-90 scale-75"
            >
              <X v-if="isOpen" class="w-6 h-6" />
              <Menu v-else class="w-6 h-6" />
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Menú mobile con stagger en links -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isOpen"
        class="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full h-screen"
      >
        <!-- Línea roja decorativa arriba del menú -->
        <div class="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

        <nav class="flex flex-col items-center justify-center h-2/3 space-y-8">
          <a
            v-for="(link, i) in navLinks"
            :key="link.name"
            :href="link.href"
            @click="closeMenu"
            class="relative text-2xl font-black uppercase tracking-widest transition-colors duration-300 group"
            :class="activeSection === link.href.replace('#','') ? 'text-red-600' : 'hover:text-red-600'"
            :style="{ 
              animation: isOpen ? `slideInUp 400ms ease-out ${i * 60}ms both` : 'none'
            }"
          >
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#contact"
            @click="closeMenu"
            class="bg-red-700 hover:bg-red-600 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(185,28,28,0.3)]"
            :style="{ animation: isOpen ? `slideInUp 400ms ease-out ${navLinks.length * 60}ms both` : 'none' }"
          >
            Sumate Hoy
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>