<script setup lang="ts">
import { ref } from 'vue';
import galeria1 from '../assets/imagenes/galeria1.png';
import galeria2 from '../assets/imagenes/galeria2.png';
import galeria3 from '../assets/imagenes/galeria3.png';
import galeria4 from '../assets/imagenes/galeria4.png';
import galeria5 from '../assets/imagenes/galeria5.png';
import galeria6 from '../assets/imagenes/galeria6.png';
import galeria7 from '../assets/imagenes/galeria7.png';
import galeria8 from '../assets/imagenes/galeria8.png';
import galeria9 from  '../assets/imagenes/galeria9 .png'


// Define tus imágenes aquí o impórtalas desde un archivo constants
const GALLERY_IMAGES = ref([
  galeria1,
  galeria2,
  galeria3,
  galeria4,
  galeria5,
  galeria6,
  galeria7,
  galeria8,
  galeria9,
]);
</script>

<template>
  <section class="py-24 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-red-600 font-black tracking-widest uppercase mb-2">Nuestro Dojo</h2>
        <h3 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
          Galería de<span class="text-zinc-700"> Imágenes</span>
        </h3>
        <p class="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-4">
          #BJJElite #ARTESUAVE
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="(image, index) in GALLERY_IMAGES"
          :key="index"
          class="relative aspect-square overflow-hidden group cursor-pointer border border-zinc-900 hover:border-red-600/50 transition-all duration-500"
        >
          <img
            :src="image"
            :alt="`Gallery ${index + 1}`"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            referrerpolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span class="text-white text-xs font-bold uppercase tracking-[0.3em]">Ver Imagen</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>