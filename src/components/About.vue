<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Sword, ShieldCheck, Zap, Heart } from 'lucide-vue-next';
import img from '../assets/imagenes/tatami.jpg'

const pillars = [
  { 
    icon: Zap, 
    title: 'Técnica', 
    desc: 'Aprende el uso eficiente del cuerpo para dominar oponentes de cualquier tamaño.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Defensa Personal', 
    desc: 'Sistemas reales y efectivos de combate cuerpo a cuerpo y control.' 
  },
  { 
    icon: Sword, 
    title: 'Disciplina Marcial', 
    desc: 'Respeto, constancia y una mentalidad de guerrero dentro y fuera del tatami.' 
  },
  { 
    icon: Heart, 
    title: 'Condición Física', 
    desc: 'Desarrolla fuerza funcional, flexibilidad y resistencia cardiovascular extrema.' 
  },
];

// --- Animación de entrada con Intersection Observer ---
const section = ref<HTMLElement | null>(null);
const textVisible = ref(false);
const cardsVisible = ref(false);
const imageVisible = ref(false);

// --- Parallax en la imagen ---
const parallaxY = ref(0);

function handleScroll() {
  if (!section.value) return;
  const rect = section.value.getBoundingClientRect();
  const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
  parallaxY.value = centerOffset * 0.08;
}

onMounted(() => {
  const textObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      textVisible.value = true;
      textObserver.disconnect();
    }
  }, { threshold: 0.2 });

  const cardsObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => { cardsVisible.value = true; }, 200);
      cardsObserver.disconnect();
    }
  }, { threshold: 0.1 });

  const imageObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      imageVisible.value = true;
      imageObserver.disconnect();
    }
  }, { threshold: 0.15 });

  if (section.value) {
    textObserver.observe(section.value);
    cardsObserver.observe(section.value);
    imageObserver.observe(section.value);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div ref="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">

      <!-- Bloque de texto -->
      <div class="space-y-8">

        <!-- Título con animación de entrada desde abajo -->
        <div
          :class="textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          class="transition-all duration-700 ease-out"
        >
          <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
            La Filosofía
            <!-- Línea roja animada bajo el subtítulo -->
            <span
              :class="textVisible ? 'w-full' : 'w-0'"
              class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
            ></span>
          </h2>
          <h3 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">
            ¿En qué consiste <br />
            <span class="text-zinc-500">el BJJ?</span>
          </h3>
        </div>

        <!-- Párrafo con animación ligeramente retrasada -->
        <p
          :class="textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          class="text-zinc-400 text-lg leading-relaxed transition-all duration-700 delay-200 ease-out"
        >
          El Jiu Jitsu Brasileño (BJJ) es un arte marcial, deporte de combate y sistema de defensa personal centrado en la lucha en el suelo. Su premisa es que una persona más pequeña y débil puede defenderse con éxito contra un oponente más grande y fuerte mediante el uso de la técnica y el apalancamiento.
        </p>

        <!-- Cards con stagger -->
        <div class="grid sm:grid-cols-2 gap-8">
          <div 
            v-for="(item, idx) in pillars" 
            :key="idx"
            :class="cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
            :style="{ transitionDelay: cardsVisible ? `${idx * 120}ms` : '0ms' }"
            class="group p-6 border border-zinc-900 bg-zinc-950/50 hover:border-red-600/50 hover:bg-zinc-900/60 transition-all duration-500 ease-out rounded-sm"
          >
            <div class="mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <component :is="item.icon" class="w-8 h-8 text-red-600" />
            </div>
            <h4 class="text-xl font-bold uppercase mb-2 group-hover:text-red-500 transition-colors duration-300">
              {{ item.title }}
            </h4>
            <p class="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors duration-300">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Imagen con parallax y animación de entrada desde la derecha -->
      <div
        :class="imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
        class="relative group transition-all duration-1000 ease-out"
      >
        <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative overflow-hidden rounded-lg aspect-[4/5] bg-zinc-900">
          <img 
            :src="img" 
            alt="BJJ Training" 
            :style="{ transform: `translateY(${parallaxY}px) scale(1.12)` }"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 will-change-transform"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div class="absolute bottom-10 left-10">
            <span class="text-6xl font-black text-white/10 uppercase italic">SUKATA</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>