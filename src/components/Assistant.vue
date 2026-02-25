<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { MessageSquare, X, Send, Bot } from 'lucide-vue-next';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const isOpen = ref(false);
const messages = ref<Message[]>([
  { role: 'bot', text: '¡Hola! Soy tu asistente de Sukata BJJ. ¿Tenés dudas sobre clases, horarios o técnica? ¡Oss!' }
]);
const input = ref('');
const isLoading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const SYSTEM_PROMPT = `Sos el asistente virtual de Sukata BJJ, academia de Jiu Jitsu Brasileño en Hipólito Yrigoyen 1980, Martínez, Buenos Aires.
Respondé de forma motivadora, amigable y concisa (máximo 3 oraciones).
Usá términos de BJJ cuando sea apropiado.
Clases disponibles: Kimono, No-Gi, Femenino y Pro.
Instructor principal: Adrián Cabrera, Cinturón Negro 4to Grado, 20 años de experiencia.
Instagram: @sukatamartinez | WhatsApp: +54 9 11 5614-2680.
Terminá con "¡Oss!" cuando sea apropiado.`;

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const userMsg = input.value.trim();
  messages.value.push({ role: 'user', text: userMsg });
  input.value = '';
  isLoading.value = true;
  scrollToBottom();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMsg },
        ],
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content ?? '¡Perdón, tuve un problema técnico! ¡Oss!';
    messages.value.push({ role: 'bot', text: botText });
  } catch (error) {
    messages.value.push({ role: 'bot', text: 'Hubo un error en el tatami virtual. ¡Intentalo de nuevo! ¡Oss!' });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) handleSend();
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
          <div>
            <span class="font-black uppercase italic tracking-widest text-sm block">Asistente Sukata</span>
            <span class="text-[10px] text-green-500 font-bold uppercase tracking-widest">● En línea</span>
          </div>
        </div>
        <button @click="isOpen = false" class="text-zinc-500 hover:text-white transition-colors">
          <X />
        </button>
      </div>

      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(m, i) in messages"
          :key="i"
          :class="['flex', m.role === 'user' ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'max-w-[80%] p-3 rounded-lg text-sm leading-relaxed',
              m.role === 'user'
                ? 'bg-red-700 text-white rounded-br-none'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-bl-none'
            ]"
          >
            {{ m.text }}
          </div>
        </div>

        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-zinc-900 border border-zinc-800 p-3 rounded-lg rounded-bl-none flex gap-1 items-center">
            <span class="w-2 h-2 bg-red-600 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-red-600 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-red-600 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
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
            :disabled="isLoading"
            placeholder="Escribe tu duda..."
            class="w-full bg-black border border-zinc-800 p-3 pr-12 rounded-lg text-sm text-white focus:outline-none focus:border-red-600 disabled:opacity-50 transition-colors"
          />
          <button
            @click="handleSend"
            :disabled="isLoading || !input.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-500 disabled:opacity-30 transition-colors"
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