<script setup lang="ts">
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
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="mb-16">
      <h2 class="text-red-600 font-black tracking-widest uppercase mb-2">Por qué elegirnos</h2>
      <h3 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
        Más que un <span class="text-zinc-600">Deporte</span>
      </h3>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="(item, idx) in benefitList"
        :key="idx" 
        class="group relative p-10 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-red-600 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      >
        <div class="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-red-600 transition-all duration-500" />
        <div class="mb-6 flex justify-center text-red-600 group-hover:scale-110 transition-transform duration-500">
          <component :is="item.icon" class="w-10 h-10" />
        </div>
        <h4 class="text-2xl font-black uppercase italic mb-4 group-hover:text-red-500 transition-colors tracking-tight">
          {{ item.title }}
        </h4>
        <p class="text-zinc-500 leading-relaxed text-sm">{{ item.desc }}</p>
        
        <div class="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span class="text-[10px] font-black tracking-widest text-red-600 uppercase italic">Power & Honor</span>
        </div>
      </div>
    </div>
  </div>
</template>