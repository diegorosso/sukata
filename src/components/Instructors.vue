<script setup lang="ts">
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
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
      class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
    >
      <div>
        <h2 class="text-red-600 font-black tracking-widest uppercase mb-2">
          Nuestro Equipo
        </h2>
        <h3
          class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter"
        >
          Liderazgo <span class="text-zinc-700">Élite</span>
        </h3>
      </div>
      <p class="max-w-md text-zinc-500 text-right italic font-medium">
        Entrena con campeones internacionales y maestros dedicados a transmitir
        la técnica más pura del Jiu Jitsu Brasileño.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-12">
      <div v-for="(ins, idx) in instructors" :key="idx" class="group relative">
        <div
          class="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-l border-red-900/50"
        >
          <img
            :src="ins.image"
            :alt="ins.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
          ></div>

          <div class="absolute bottom-0 left-0 p-8 w-full">
            <div
              class="h-1 w-12 bg-red-600 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
            ></div>
            <h4
              class="text-3xl font-black uppercase italic tracking-tighter leading-none mb-2"
            >
              {{ ins.name }}
            </h4>
            <p
              class="text-red-500 font-bold uppercase text-xs tracking-widest mb-1"
            >
              {{ ins.rank }}
            </p>
            <p
              class="text-zinc-400 text-xs font-medium uppercase tracking-widest"
            >
              {{ ins.exp }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
