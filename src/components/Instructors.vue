<script setup lang="ts">
import { ref, onMounted } from 'vue';
import adriImage from '../assets/imagenes/adri.jpg';
import demi from '../assets/imagenes/demi.png';
import demi2 from '../assets/imagenes/demi2.png';

interface Instructor {
  name: string;
  rank: string;
  exp: string;
  image: string;
}

const instructors: Instructor[] = [
  {
    name: "Adrián Cabrera",
    rank: "Cinturón Negro 4to Grado",
    exp: "20 años de experiencia",
    image: adriImage,
  },
  {
    name: "Elena Rodríguez",
    rank: "Cinturón Negro",
    exp: "12 años de experiencia",
    image: demi
  },
  {
    name: "Marcus Henderson",
    rank: "Cinturón Negro 1er Grado",
    exp: "18 años de experiencia",
    image: demi2,
  },
];

const section = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const cardsVisible = ref(false);

onMounted(() => {
  const observe = (el: HTMLElement | null, cb: () => void, threshold = 0.15) => {
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
  };

  if (section.value) {
    observe(section.value, () => { titleVisible.value = true; }, 0.1);
    observe(section.value, () => { setTimeout(() => { cardsVisible.value = true; }, 250); }, 0.05);
  }
});
</script>

<template>
  <div ref="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Header con animación de entrada -->
    <div
      class="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 transition-all duration-700 ease-out"
      :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <div class="text-center md:text-left">
        <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
          Nuestro Equipo
          <span
            :class="titleVisible ? 'w-full' : 'w-0'"
            class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
          ></span>
        </h2>
        <h3
          class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2 transition-all duration-700 delay-200 ease-out"
          :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          Liderazgo <span class="text-zinc-700">Élite</span>
        </h3>
      </div>

      <p
        class="max-w-md text-zinc-500 text-center md:text-right italic font-medium transition-all duration-700 ease-out"
        :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 350ms;"
      >
        Entrena con campeones internacionales y maestros dedicados a transmitir
        la técnica más pura del Jiu Jitsu Brasileño.
      </p>
    </div>

    <!-- Cards con stagger -->
    <div class="grid md:grid-cols-3 gap-12">
      <div
        v-for="(ins, idx) in instructors"
        :key="idx"
        class="group relative transition-all duration-700 ease-out"
        :class="cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
        :style="{ transitionDelay: cardsVisible ? `${idx * 150}ms` : '0ms' }"
      >
        <div
          class="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-l border-red-900/50 group-hover:border-red-600 group-hover:shadow-[0_0_40px_rgba(185,28,28,0.15)]"
        >
          <img
            :src="ins.image"
            :alt="ins.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div class="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-all duration-700"></div>

          <div class="absolute bottom-0 left-0 p-8 w-full">
            <div class="h-1 w-12 bg-red-600 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <h4 class="text-3xl font-black uppercase italic tracking-tighter leading-none mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
              {{ ins.name }}
            </h4>
            <p class="text-red-500 font-bold uppercase text-xs tracking-widest mb-1 transition-colors duration-300 group-hover:text-red-400">
              {{ ins.rank }}
            </p>
            <p class="text-zinc-400 text-xs font-medium uppercase tracking-widest transition-colors duration-300 group-hover:text-zinc-300">
              {{ ins.exp }}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>