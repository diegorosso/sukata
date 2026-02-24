<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const videos = [
  "videos/video1.mp4",
   "videos/video2.mp4",
];

const currentVideo = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    currentVideo.value = (currentVideo.value + 1) % videos.length;
  }, 10000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
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
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    >
    </video>

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <div class="max-w-4xl space-y-6">
        <p class="text-red-600 font-black tracking-[0.3em] uppercase text-sm md:text-lg animate-pulse">
          Disciplina · Técnica · Poder
        </p>
        <h1 class="text-5xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none">
           SUKATA<br />
          <span class="text-red-700 drop-shadow-lg">JIU JITSU</span>
        </h1>
        <p class="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium">
          Domina el arte suave. Transforma tu cuerpo y forja una mente inquebrantable en el tatami más prestigioso.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a 
            href="#contact" 
            class="bg-red-700 hover:bg-red-600 text-white text-xl px-12 py-5 rounded-sm font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(185,28,28,0.3)] hover:shadow-[0_0_50px_rgba(185,28,28,0.5)]"
          >
            Súmate Hoy
          </a>
          <a 
            href="#about" 
            class="border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-md text-white text-xl px-12 py-5 rounded-sm font-black uppercase tracking-widest transition-all"
          >
            Conocer más
          </a>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
      <button
        v-for="(_, i) in videos"
        :key="i"
        @click="setVideo(i)"
        :class="[
          'h-1 rounded-full transition-all',
          i === currentVideo ? 'bg-red-600 w-20' : 'bg-zinc-700 hover:bg-zinc-500 w-12'
        ]"
      />
    </div>
  </div>
</template>
