<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
const isSubmitting = ref(false);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;
  status.value = 'Enviando...';

  setTimeout(() => {
    status.value = '¡Mensaje enviado con éxito! Oss.';
    formState.value = { name: '', email: '', message: '' };
    isSubmitting.value = false;
    setTimeout(() => { status.value = ''; }, 3000);
  }, 1500);
};

// Animaciones
const section = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const infoVisible = ref(false);
const formVisible = ref(false);

onMounted(() => {
  const observe = (el: HTMLElement | null, cb: () => void, threshold = 0.1) => {
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
  };

  if (section.value) {
    observe(section.value, () => { titleVisible.value = true; }, 0.1);
    observe(section.value, () => { setTimeout(() => { infoVisible.value = true; }, 200); }, 0.05);
    observe(section.value, () => { setTimeout(() => { formVisible.value = true; }, 400); }, 0.05);
  }
});
</script>

<template>
  <div ref="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16">

      <!-- Columna izquierda: info -->
      <div class="space-y-12">

        <!-- Título -->
        <div
          class="transition-all duration-700 ease-out"
          :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
            Contacto
            <span
              :class="titleVisible ? 'w-full' : 'w-0'"
              class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
            ></span>
          </h2>
          <h3
            class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2 transition-all duration-700 delay-200 ease-out"
            :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          >
            Empieza tu <span class="text-zinc-700">Viaje</span>
          </h3>
        </div>

        <!-- Info de contacto con stagger -->
        <div class="space-y-8">
          <div
            v-for="(item, idx) in [
              { icon: MapPin, title: 'Ubicación', text: 'Hipólito Yrigoyen 1980, Martínez, Buenos Aires' },
              { icon: Phone,  title: 'Teléfono',  text: '+1 234 567 890' },
              { icon: Mail,   title: 'Email',     text: 'info@sukata.com' },
            ]"
            :key="idx"
            class="flex items-center gap-6 group transition-all duration-600 ease-out"
            :class="infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
            :style="{ transitionDelay: infoVisible ? `${idx * 120}ms` : '0ms' }"
          >
            <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-sm text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-black uppercase italic tracking-widest group-hover:text-red-500 transition-colors duration-300">{{ item.title }}</h4>
              <p class="text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <!-- Redes sociales -->
        <div
          class="flex gap-4 pt-4 transition-all duration-700 ease-out"
          :class="infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 400ms;"
        >
          <a
            href="#"
            class="p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-600 hover:border-red-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          >
            <Instagram class="w-6 h-6" />
          </a>
          <a
            href="#"
            class="p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-600 hover:border-red-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          >
            <Facebook class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- Columna derecha: formulario -->
      <div
        class="relative transition-all duration-1000 ease-out"
        :class="formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
      >
        <div class="absolute -inset-4 bg-red-600/10 blur-3xl -z-10 rounded-full"></div>

        <form
          @submit="handleSubmit"
          class="p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-sm space-y-6 shadow-2xl"
        >
          <!-- Nombre -->
          <div
            class="space-y-2 transition-all duration-500 ease-out"
            :class="formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="transition-delay: 500ms;"
          >
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">Nombre Completo</label>
            <input
              v-model="formState.name"
              type="text"
              required
              placeholder="Ingresa tu nombre"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 hover:border-zinc-600 transition-colors uppercase italic tracking-widest text-sm"
            />
          </div>

          <!-- Email -->
          <div
            class="space-y-2 transition-all duration-500 ease-out"
            :class="formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="transition-delay: 600ms;"
          >
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">Correo Electrónico</label>
            <input
              v-model="formState.email"
              type="email"
              required
              placeholder="email@ejemplo.com"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 hover:border-zinc-600 transition-colors uppercase italic tracking-widest text-sm"
            />
          </div>

          <!-- Mensaje -->
          <div
            class="space-y-2 transition-all duration-500 ease-out"
            :class="formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="transition-delay: 700ms;"
          >
            <label class="text-xs font-black uppercase tracking-widest text-zinc-500">Mensaje</label>
            <textarea
              v-model="formState.message"
              rows="4"
              placeholder="¿Cómo podemos ayudarte?"
              class="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 hover:border-zinc-600 transition-colors uppercase italic tracking-widest text-sm resize-none"
            ></textarea>
          </div>

          <!-- Botón enviar -->
          <div
            class="transition-all duration-500 ease-out"
            :class="formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="transition-delay: 800ms;"
          >
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-red-700 hover:bg-red-600 py-5 font-black uppercase tracking-[0.2em] italic text-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(185,28,28,0.2)] hover:shadow-[0_0_40px_rgba(185,28,28,0.4)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span>{{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}</span>
              <Send
                class="w-5 h-5 transition-transform duration-300"
                :class="isSubmitting ? 'translate-x-1 opacity-50' : 'group-hover:translate-x-1'"
              />
            </button>
          </div>

          <!-- Estado del envío -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
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
input::placeholder,
textarea::placeholder {
  text-transform: none;
  font-style: normal;
  letter-spacing: 0.05em;
}
</style>