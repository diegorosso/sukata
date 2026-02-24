<script setup lang="ts">
import { ref } from 'vue';

// Define tus imágenes aquí o impórtalas desde un archivo constants
const GALLERY_IMAGES = ref([
  'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583473203834-8d69e0b90139?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
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