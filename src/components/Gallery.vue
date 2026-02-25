<script setup lang="ts">
import { ref, onMounted } from 'vue';
import galeria1 from '../assets/imagenes/galeria1.png';
import galeria2 from '../assets/imagenes/galeria2.png';
import galeria3 from '../assets/imagenes/galeria3.png';
import galeria4 from '../assets/imagenes/galeria4.png';
import galeria5 from '../assets/imagenes/galeria5.png';
import galeria6 from '../assets/imagenes/galeria6.png';
import galeria7 from '../assets/imagenes/galeria7.png';
import galeria8 from '../assets/imagenes/galeria8.png';
import galeria9 from  '../assets/imagenes/galeria9 .png';

const GALLERY_IMAGES = ref([
  galeria1, galeria2, galeria3,
  galeria4, galeria5, galeria6,
  galeria7, galeria8, galeria9,
]);

// Lightbox
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
};
const closeLightbox = () => { lightboxOpen.value = false; };
const prevImage = () => { lightboxIndex.value = (lightboxIndex.value - 1 + GALLERY_IMAGES.value.length) % GALLERY_IMAGES.value.length; };
const nextImage = () => { lightboxIndex.value = (lightboxIndex.value + 1) % GALLERY_IMAGES.value.length; };

// Animaciones de entrada
const section = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const visibleItems = ref<boolean[]>(new Array(9).fill(false));

onMounted(() => {
  // Observer para el título
  const titleObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { titleVisible.value = true; titleObs.disconnect(); }
  }, { threshold: 0.2 });

  // Observer individual por imagen para stagger real al hacer scroll
  const imageEls = document.querySelectorAll('.gallery-item');
  imageEls.forEach((el, i) => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { visibleItems.value[i] = true; }, i * 80);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  });

  if (section.value) titleObs.observe(section.value);

  // Keyboard nav para lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxOpen.value) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  });
});
</script>

<template>
  <section ref="section" class="py-24 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Título -->
      <div
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
          Nuestro Dojo
          <span
            :class="titleVisible ? 'w-full' : 'w-0'"
            class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
          ></span>
        </h2>
        <h3
          class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mt-2 transition-all duration-700 delay-200 ease-out"
          :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          Galería de<span class="text-zinc-700"> Imágenes</span>
        </h3>
        <p
          class="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-4 transition-all duration-700 delay-300 ease-out"
          :class="titleVisible ? 'opacity-100' : 'opacity-0'"
        >
          #BJJElite #ARTESUAVE
        </p>
      </div>

      <!-- Grid de imágenes -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="(image, index) in GALLERY_IMAGES"
          :key="index"
          class="gallery-item relative aspect-square overflow-hidden group cursor-pointer border border-zinc-900 hover:border-red-600/50 transition-all duration-500 ease-out"
          :class="visibleItems[index] ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'"
          :style="{ transition: 'opacity 600ms ease-out, transform 600ms ease-out, border-color 500ms' }"
          @click="openLightbox(index)"
        >
          <img
            :src="image"
            :alt="`Gallery ${index + 1}`"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            referrerpolicy="no-referrer"
          />
          <!-- Overlay con ícono + y número -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
            <span class="text-white text-3xl font-black leading-none">+</span>
            <span class="text-white text-xs font-bold uppercase tracking-[0.3em]">Ver Imagen</span>
          </div>
          <!-- Borde rojo animado en esquina -->
          <div class="absolute top-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500 ease-out"></div>
          <div class="absolute bottom-0 right-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500 ease-out delay-100"></div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <!-- Cerrar -->
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-zinc-400 hover:text-white text-3xl font-black transition-colors leading-none z-10"
        >✕</button>

        <!-- Flecha izquierda -->
        <button
          @click="prevImage"
          class="absolute left-4 md:left-10 text-zinc-400 hover:text-red-500 transition-colors z-10 p-2"
        >
          <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Imagen activa -->
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <img
            :key="lightboxIndex"
            :src="GALLERY_IMAGES[lightboxIndex]"
            :alt="`Gallery ${lightboxIndex + 1}`"
            class="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
            referrerpolicy="no-referrer"
          />
        </Transition>

        <!-- Flecha derecha -->
        <button
          @click="nextImage"
          class="absolute right-4 md:right-10 text-zinc-400 hover:text-red-500 transition-colors z-10 p-2"
        >
          <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Contador -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span class="text-zinc-500 text-xs font-black uppercase tracking-widest">
            {{ lightboxIndex + 1 }} / {{ GALLERY_IMAGES.length }}
          </span>
        </div>

        <!-- Dots indicadores -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(_, i) in GALLERY_IMAGES"
            :key="i"
            @click="lightboxIndex = i"
            class="transition-all duration-300 rounded-full"
            :class="i === lightboxIndex ? 'w-6 h-1.5 bg-red-600' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'"
          ></button>
        </div>
      </div>
    </Transition>

  </section>
</template>