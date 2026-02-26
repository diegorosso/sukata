<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
];

const currentVideo = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

// Controla cuándo arrancan las animaciones de entrada
const mounted = ref(false);

onMounted(() => {
  // Pequeño delay para que el navegador pinte primero y la animación se vea limpia
  setTimeout(() => { mounted.value = true; }, 100);

  timer = setInterval(() => {
    currentVideo.value = (currentVideo.value + 1) % videos.length;
  }, 10000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const setVideo = (index: number) => {
  currentVideo.value = index;
};
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden">

    <!-- Video Carousel -->
    <video
      v-for="(src, index) in videos"
      :key="src"
      :src="src"
      :class="[
        'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out',
        index === currentVideo ? 'opacity-40' : 'opacity-0'
      ]"
      autoplay muted loop playsinline preload="auto"
    />

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>

    <!-- Líneas decorativas laterales que se expanden al entrar -->
    <div
      class="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-red-600/40 to-transparent transition-all duration-1000 ease-out"
      :class="mounted ? 'h-64 opacity-100' : 'h-0 opacity-0'"
      style="transition-delay: 800ms;"
    ></div>
    <div
      class="absolute right-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-red-600/40 to-transparent transition-all duration-1000 ease-out"
      :class="mounted ? 'h-64 opacity-100' : 'h-0 opacity-0'"
      style="transition-delay: 800ms;"
    ></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <div class="max-w-4xl space-y-6">

        <!-- Subtítulo superior -->
        <p
          class="text-red-600 font-black tracking-[0.3em] uppercase text-sm md:text-lg transition-all duration-700 ease-out"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
          style="transition-delay: 200ms;"
        >
          <span class="animate-pulse">Disciplina · Técnica · Poder</span>
        </p>

        <!-- Título principal: entra desde abajo con escala -->
        <h1
          class="text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none transition-all duration-1000 ease-out"
          :class="mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'"
          style="transition-delay: 350ms;"
        >
          SUKATA<br />
          <span class="text-red-700 drop-shadow-lg">JIU JITSU</span>
        </h1>

        <!-- Línea separadora animada -->
        <div class="flex items-center justify-center gap-4 overflow-hidden">
          <div
            class="h-px bg-red-600/50 transition-all duration-700 ease-out"
            :class="mounted ? 'w-16 opacity-100' : 'w-0 opacity-0'"
            style="transition-delay: 700ms;"
          ></div>
          <div
            class="w-1.5 h-1.5 rounded-full bg-red-600 transition-all duration-500"
            :class="mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
            style="transition-delay: 850ms;"
          ></div>
          <div
            class="h-px bg-red-600/50 transition-all duration-700 ease-out"
            :class="mounted ? 'w-16 opacity-100' : 'w-0 opacity-0'"
            style="transition-delay: 700ms;"
          ></div>
        </div>

        <!-- Descripción -->
        <p
          class="px-6 text-zinc-400 text-base md:text-2xl max-w-2xl mx-auto font-medium transition-all duration-700 ease-out"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          style="transition-delay: 600ms;"
        >
          Domina el arte suave. Transforma tu cuerpo y forja una mente inquebrantable en el tatami más prestigioso.
        </p>

        <!-- Botones con stagger -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href="#contact"
            class="bg-red-700 w-[260px] hover:bg-red-600 text-white text-xl px-12 py-5 rounded-sm  w-fit mx-auto md:mx-0 font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(185,28,28,0.3)] hover:shadow-[0_0_50px_rgba(185,28,28,0.5)]"
            :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            style="transition: opacity 600ms ease-out, transform 600ms ease-out, background-color 300ms, box-shadow 300ms, scale 300ms; transition-delay: 800ms;"
          >
            Súmate Hoy
          </a>
          <a
            href="#about"
            class="border w-[260px] mx-auto md:mx-0 border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-md text-white text-l px-12 py-5 rounded-sm font-black uppercase tracking-widest transition-all duration-300 hover:bg-white/10"
            :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            style="transition: opacity 600ms ease-out, transform 600ms ease-out, border-color 300ms, background-color 300ms; transition-delay: 950ms;"
          >
            Conocer más
          </a>
        </div>

      </div>
    </div>

    <!-- Indicador de scroll -->
    <div
      class="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ease-out"
      :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      style="transition-delay: 1200ms;"
    >
      <span class="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-600">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent animate-bounce"></div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
      <button
        v-for="(_, i) in videos"
        :key="i"
        @click="setVideo(i)"
        :class="[
          'h-1 rounded-full transition-all duration-500',
          i === currentVideo ? 'bg-red-600 w-20' : 'bg-zinc-700 hover:bg-zinc-500 w-12'
        ]"
      />
    </div>

  </div>
</template>