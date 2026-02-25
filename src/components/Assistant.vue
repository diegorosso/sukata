<script setup lang="ts">
import { ref } from 'vue';
import { MessageSquare, X, Send, Bot } from 'lucide-vue-next';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const isOpen = ref(false);
const messages = ref<Message[]>([
  { role: 'bot', text: '¡Hola! Soy tu asistente de Sukata Bjj. ¿Tienes dudas sobre clases, precios o técnica? Oss.' }
]);
const input = ref('');
const isLoading = ref(false);

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const userMsg = input.value;
  messages.value.push({ role: 'user', text: userMsg });
  input.value = '';
  isLoading.value = true;

  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Eres el asistente virtual de una academia de Jiu Jitsu Brasileño llamada "BJJ Élite". Responde de forma motivadora, profesional y concisa. Usa términos de BJJ si es necesario. Pregunta: ${userMsg}`,
    });

    const botText = response.text || 'Perdona, he tenido un problema técnico. ¡Oss!';
    messages.value.push({ role: 'bot', text: botText });
  } catch (error) {
    messages.value.push({ role: 'bot', text: 'Hubo un error contactando con el tatami virtual. Inténtalo de nuevo.' });
  } finally {
    isLoading.value = false;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleSend();
};
</script>

<template>
  <!-- Botón flotante -->
  <button
    @click="isOpen = true"
    class="fixed bottom-8 right-8 z-50 bg-red-700 p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all hover:scale-110 active:scale-95 group"
  >
    <MessageSquare class="w-8 h-8 text-white" />
    <span class="absolute right-full mr-4 bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
      ¿Alguna duda? Pregúntame
    </span>
  </button>

  <!-- Chat window -->
  <Transition name="chat">
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-8 z-50 w-[350px] md:w-[400px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-red-600 rounded-lg">
            <Bot class="w-5 h-5 text-white" />
          </div>
          <span class="font-black uppercase italic tracking-widest text-sm">Asistente Élite</span>
        </div>
        <button @click="isOpen = false" class="text-zinc-500 hover:text-white">
          <X />
        </button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(m, i) in messages"
          :key="i"
          :class="['flex', m.role === 'user' ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'max-w-[80%] p-3 rounded-lg text-sm',
              m.role === 'user'
                ? 'bg-red-700 text-white rounded-br-none'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-bl-none'
            ]"
          >
            {{ m.text }}
          </div>
        </div>

        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-zinc-900 text-zinc-500 p-3 rounded-lg text-xs animate-pulse">
            Pensando técnica...
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 bg-zinc-900 border-t border-zinc-800">
        <div class="relative">
          <input
            type="text"
            v-model="input"
            @keydown="handleKeyDown"
            placeholder="Escribe tu duda..."
            class="w-full bg-black border border-zinc-800 p-3 pr-12 rounded-lg text-sm text-white focus:outline-none focus:border-red-600"
          />
          <button
            @click="handleSend"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-500"
          >
            <Send class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>