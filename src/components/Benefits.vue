<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Target, Users, Brain, Activity } from 'lucide-vue-next';

const benefitList = [
  { 
    icon: Target, 
    title: 'Enfoque Mental', 
    desc: 'Aprende a resolver problemas bajo presión extrema.' 
  },
  { 
    icon: Users, 
    title: 'Comunidad', 
    desc: 'Forma parte de una familia que comparte tus mismos valores.' 
  },
  { 
    icon: Brain, 
    title: 'Resiliencia', 
    desc: 'Fortalece tu carácter a través de la superación de retos.' 
  },
  { 
    icon: Activity, 
    title: 'Salud Total', 
    desc: 'Quema hasta 800 calorías por sesión de entrenamiento.' 
  },
];

const section = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const cardsVisible = ref(false);

onMounted(() => {
  const titleObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      titleVisible.value = true;
      titleObserver.disconnect();
    }
  }, { threshold: 0.3 });

  const cardsObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => { cardsVisible.value = true; }, 150);
      cardsObserver.disconnect();
    }
  }, { threshold: 0.1 });

  if (section.value) {
    titleObserver.observe(section.value);
    cardsObserver.observe(section.value);
  }
});
</script>

<template>
  <div ref="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

    <!-- Título con animación de entrada -->
    <div
      class="mb-16 transition-all duration-700 ease-out"
      :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
        Por qué elegirnos
        <span
          :class="titleVisible ? 'w-full' : 'w-0'"
          class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
        ></span>
      </h2>
      <h3
        class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2 transition-all duration-700 delay-200 ease-out"
        :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        Más que un <span class="text-zinc-600">Deporte</span>
      </h3>
    </div>

    <!-- Cards con stagger -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="(item, idx) in benefitList"
        :key="idx"
        :class="cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        :style="{ transitionDelay: cardsVisible ? `${idx * 120}ms` : '0ms' }"
        class="group relative p-10 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-red-600 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      >
        <!-- Línea lateral izquierda animada en hover -->
        <div class="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />

        <!-- Ícono con rotate + scale en hover -->
        <div class="mb-6 flex justify-center text-red-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
          <component :is="item.icon" class="w-10 h-10" />
        </div>

        <h4 class="text-2xl font-black uppercase italic mb-4 group-hover:text-red-500 transition-colors duration-300 tracking-tight">
          {{ item.title }}
        </h4>
        <p class="text-zinc-500 leading-relaxed text-sm group-hover:text-zinc-400 transition-colors duration-300">
          {{ item.desc }}
        </p>
        
        <div class="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span class="text-[10px] font-black tracking-widest text-red-600 uppercase italic">Power & Honor</span>
        </div>
      </div>
    </div>

  </div>
</template>