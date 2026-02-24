<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-vue-next';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const formState = ref<FormState>({
  name: '',
  email: '',
  message: ''
});

const status = ref('');

const handleSubmit = (e: Event) => {
  e.preventDefault();
  status.value = 'Enviando...';
  
  setTimeout(() => {
    status.value = '¡Mensaje enviado con éxito! Oss.';
    formState.value = { name: '', email: '', message: '' };
    
    // Limpiar el mensaje de estado después de 3 segundos
    setTimeout(() => {
      status.value = '';
    }, 3000);
  }, 1500);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16">
      <div class="space-y-12">
        <div>
          <h2 class="text-red-600 font-black tracking-widest uppercase mb-2">Contacto</h2>
          <h3 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Empieza tu <span class="text-zinc-700">Viaje</span>
          </h3>
        </div>

        <div class="space-y-8">
          <div class="flex items-center gap-6 group">
            <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
              <MapPin class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-black uppercase italic tracking-widest">Ubicación</h4>
              <p class="text-zinc-500">Calle del Tatami 123, BJJ District</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 group">
            <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
              <Phone class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-black uppercase italic tracking-widest">Teléfono</h4>
              <p class="text-zinc-500">+1 234 567 890</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 group">
            <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
              <Mail class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-black uppercase italic tracking-widest">Email</h4>
              <p class="text-zinc-500">info@bjj-elite.com</p>
            </div>
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <a 
            href="#" 
            class="p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-600 hover:border-red-600 transition-all"
          >
            <Instagram class="w-6 h-6" />
          </a>
          <a 
            href="#" 
            class="p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-600 hover:border-red-600 transition-all"
          >
            <Facebook class="w-6 h-6" />
          </a>
        </div>
      </div>

      <div class="relative">
        <div class="absolute -inset-4 bg-red-600/10 blur-3xl -z-10 rounded-full"></div>
        <form 
          @submit="handleSubmit"
          class="p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-sm space-y-6 shadow-2xl"
        >
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">
              Nombre Completo
            </label>
            <input 
              v-model="formState.name"
              type="text" 
              required
              placeholder="Ingresa tu nombre"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase italic tracking-widest text-sm"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">
              Correo Electrónico
            </label>
            <input 
              v-model="formState.email"
              type="email" 
              required
              placeholder="email@ejemplo.com"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase italic tracking-widest text-sm"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">
              Mensaje
            </label>
            <textarea 
              v-model="formState.message"
              rows="4"
              placeholder="¿Cómo podemos ayudarte?"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase italic tracking-widest text-sm resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-red-700 hover:bg-red-600 py-5 font-black uppercase tracking-[0.2em] italic text-lg transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(185,28,28,0.2)]"
          >
            Enviar Mensaje <Send class="w-5 h-5" />
          </button>
          
          <Transition name="fade">
            <p 
              v-if="status" 
              class="text-center text-xs font-bold text-red-500 uppercase tracking-widest mt-4"
            >
              {{ status }}
            </p>
          </Transition>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>