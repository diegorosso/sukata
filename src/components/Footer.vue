<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentYear = new Date().getFullYear();

const section = ref<HTMLElement | null>(null);
const topVisible = ref(false);
const textVisible = ref(false);

onMounted(() => {
  const observe = (el: HTMLElement | null, cb: () => void, threshold = 0.1) => {
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
  };

  if (section.value) {
    observe(section.value, () => { topVisible.value = true; }, 0.1);
    observe(section.value, () => { setTimeout(() => { textVisible.value = true; }, 300); }, 0.05);
  }
});
</script>

<template>
  <footer ref="section" class="bg-black py-12 border-t border-zinc-900 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Fila principal -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-700 ease-out"
        :class="topVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Logo -->
        <div
          class="flex items-center gap-2 transition-all duration-700 ease-out"
          :class="topVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'"
          style="transition-delay: 100ms;"
        >
          <img
            src="/src/assets/imagenes/logo.png"
            alt="Team Cabrera Logo"
            class="w-10 h-10 hover:scale-110 hover:rotate-3 transition-transform duration-300"
          />
          <span class="text-3xl font-black tracking-tighter uppercase italic">
            TEAM <span class="text-red-600">CABRERA</span>
          </span>
        </div>

        <!-- Links -->
        <div
          class="flex gap-8 transition-all duration-700 ease-out"
          :class="topVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 200ms;"
        >
          <a
            v-for="(link, i) in ['Privacidad', 'Términos', 'Cookies']"
            :key="i"
            href="#"
            class="relative text-zinc-500 hover:text-white transition-colors duration-300 text-xs font-black uppercase tracking-widest group"
          >
            {{ link }}
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-red-600 group-hover:w-full transition-all duration-300 ease-out"></span>
          </a>
        </div>

        <!-- Copyright -->
        <div
          class="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 ease-out"
          :class="topVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'"
          style="transition-delay: 300ms;"
        >
          © {{ currentYear }} ACADEMIA ÉLITE · ALL RIGHTS RESERVED
        </div>
      </div>

      <!-- Línea separadora animada -->
      <div
        class="mt-8 h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent transition-all duration-1000 ease-out"
        :class="topVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
        style="transition-delay: 400ms;"
      ></div>

      <!-- Texto grande de fondo -->
      <div class="mt-8 text-center overflow-hidden">
        <p
          class="text-zinc-800 text-6xl md:text-9xl font-black uppercase tracking-tighter italic pointer-events-none select-none transition-all duration-1000 ease-out"
          :class="textVisible ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-16'"
          style="transition-delay: 200ms;"
        >
          BRAZILIAN JIU JITSU
        </p>
      </div>

    </div>
  </footer>
</template>