<script setup lang="ts">
import { ShieldAlert } from 'lucide-vue-next';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-black py-12 border-t border-zinc-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2">
          <img src="/src/assets/imagenes/logo.png" alt="Team Cabrera Logo" class="w-10 h-10 text-red-600" />
          <span class="text-3xl font-black tracking-tighter uppercase italic">
            TEAM <span class="text-red-600">CABRERA</span>
          </span>
        </div>
        
        <div class="flex gap-8">
          <a 
            href="#" 
            class="text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            Privacidad
          </a>
          <a 
            href="#" 
            class="text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            Términos
          </a>
          <a 
            href="#" 
            class="text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            Cookies
          </a>
        </div>

        <div class="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">
          © {{ currentYear }} ACADEMIA ÉLITE · ALL RIGHTS RESERVED
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-zinc-800 text-6xl md:text-9xl font-black uppercase tracking-tighter italic opacity-20 pointer-events-none select-none">
          BRAZILIAN JIU JITSU
        </p>
      </div>
    </div>
  </footer>
</template>