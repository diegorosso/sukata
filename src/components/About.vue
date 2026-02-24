<script setup lang="ts">
import { Sword, ShieldCheck, Zap, Heart } from 'lucide-vue-next';
import img from '../assets/tatami.jpg'

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
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8">
        <div>
          <h2 class="text-red-600 font-black tracking-widest uppercase mb-2">La Filosofía</h2>
          <h3 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            ¿En qué consiste <br />
            <span class="text-zinc-500">el BJJ?</span>
          </h3>
        </div>
        <p class="text-zinc-400 text-lg leading-relaxed">
          El Jiu Jitsu Brasileño (BJJ) es un arte marcial, deporte de combate y sistema de defensa personal centrado en la lucha en el suelo. Su premisa es que una persona más pequeña y débil puede defenderse con éxito contra un oponente más grande y fuerte mediante el uso de la técnica y el apalancamiento.
        </p>
        <div class="grid sm:grid-cols-2 gap-8">
          <div 
            v-for="(item, idx) in pillars" 
            :key="idx" 
            class="group p-6 border border-zinc-900 bg-zinc-950/50 hover:border-red-600/50 transition-all rounded-sm"
          >
            <div class="mb-4 transform group-hover:scale-110 transition-transform">
              <component :is="item.icon" class="w-8 h-8 text-red-600" />
            </div>
            <h4 class="text-xl font-bold uppercase mb-2 group-hover:text-red-500 transition-colors">
              {{ item.title }}
            </h4>
            <p class="text-zinc-500 text-sm">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative overflow-hidden rounded-lg aspect-[4/5] bg-zinc-900">
          <img 
            :src="img" 
            alt="BJJ Training" 
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
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