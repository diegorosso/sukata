<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Clock } from 'lucide-vue-next';

interface ScheduleRow {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

const schedule: ScheduleRow[] = [
  { time: '07:30 - 08:30', mon: 'Kimono', tue: '-', wed: 'Kimono', thu: '-', fri: 'Kimono', sat: '-' },
  { time: '11:30 - 12:30', mon: '-', tue: '-', wed: '-', thu: '-', fri: '-', sat: 'Kimono' },
  { time: '12:30 - 14:00', mon: '-', tue: '-', wed: '-', thu: '-', fri: '-', sat: 'No-Gi' },
  { time: '13:30 - 14:30', mon: '-', tue: 'Kimono', wed: '-', thu: 'No-Gi', fri: '-', sat: '-' },
  { time: '15:00 - 16:00', mon: 'Kimono', tue: '-', wed: 'No-Gi', thu: '-', fri: 'Kimono', sat: '-' },
  { time: '18:00 - 19:30', mon: '-', tue: 'Kimono', wed: '-', thu: 'Kimono', fri: 'Femenino', sat: '-' },
  { time: '19:00 - 20:30', mon: '-', tue: '-', wed: 'Kimono', thu: '-', fri: '-', sat: '-' },
  { time: '19:30 - 20:30', mon: '-', tue: '-', wed: 'Femenino', thu: '-', fri: '-', sat: '-' },
  { time: '19:30 - 21:00', mon: 'No-Gi', tue: 'Kimono', wed: '-', thu: 'Kimono', fri: 'Pro', sat: '-' },
];

const getClassColor = (name: string): string => {
  if (name.includes('No-Gi')) return 'text-red-500 border-red-500/20 bg-red-500/10';
  if (name.includes('Femenino')) return 'text-pink-400 border-pink-400/20 bg-pink-400/10';
  if (name.includes('Pro')) return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
  if (name.includes('Kimono')) return 'text-zinc-300 border-zinc-300/20 bg-zinc-300/5';
  return 'text-zinc-600 border-zinc-800';
};

const getDayName = (dayKey: string): string => {
  const days: Record<string, string> = {
    mon: 'Lunes', tue: 'Martes', wed: 'Miércoles',
    thu: 'Jueves', fri: 'Viernes', sat: 'Sábado'
  };
  return days[dayKey] || dayKey;
};

// --- Animaciones ---
const section = ref<HTMLElement | null>(null);
const titleVisible = ref(false);
const tableVisible = ref(false);
const mobileVisible = ref(false);
const legendVisible = ref(false);

onMounted(() => {
  const observe = (el: HTMLElement | null, cb: () => void, threshold = 0.15) => {
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
  };

  if (section.value) {
    observe(section.value, () => { titleVisible.value = true; }, 0.1);
    observe(section.value, () => { setTimeout(() => { tableVisible.value = true; }, 250); }, 0.1);
    observe(section.value, () => { setTimeout(() => { mobileVisible.value = true; }, 150); }, 0.05);
    observe(section.value, () => { setTimeout(() => { legendVisible.value = true; }, 500); }, 0.1);
  }
});
</script>

<template>
  <div ref="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Título -->
    <div
      class="text-center mb-16 transition-all duration-700 ease-out"
      :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h2 class="text-red-600 font-black tracking-widest uppercase mb-2 relative inline-block">
        Calendario de Entrenamiento
        <span
          :class="titleVisible ? 'w-full' : 'w-0'"
          class="absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-700 delay-500 ease-out"
        ></span>
      </h2>
      <h3
        class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2 transition-all duration-700 delay-200 ease-out"
        :class="titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        Horarios <span class="text-zinc-700">Disponibles</span>
      </h3>
    </div>

    <!-- Desktop table -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-zinc-900/50 transition-all duration-700 ease-out"
            :class="tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
          >
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800 text-red-600">
              <Clock class="w-5 h-5" />
            </th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Lunes</th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Martes</th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Miércoles</th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Jueves</th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Viernes</th>
            <th class="p-6 font-black uppercase tracking-widest border-b border-zinc-800">Sábado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-900">
          <tr 
            v-for="(row, i) in schedule" 
            :key="i"
            :class="tableVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            :style="{ transitionDelay: tableVisible ? `${i * 70}ms` : '0ms' }"
            class="hover:bg-zinc-900/30 transition-all duration-500 ease-out"
          >
            <td class="p-6 font-black text-zinc-500 whitespace-nowrap">{{ row.time }}</td>
            <td class="p-6">
              <span v-if="row.mon !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.mon)]">{{ row.mon }}</span>
            </td>
            <td class="p-6">
              <span v-if="row.tue !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.tue)]">{{ row.tue }}</span>
            </td>
            <td class="p-6">
              <span v-if="row.wed !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.wed)]">{{ row.wed }}</span>
            </td>
            <td class="p-6">
              <span v-if="row.thu !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.thu)]">{{ row.thu }}</span>
            </td>
            <td class="p-6">
              <span v-if="row.fri !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.fri)]">{{ row.fri }}</span>
            </td>
            <td class="p-6">
              <span v-if="row.sat !== '-'" :class="['px-3 py-1 border rounded-full text-xs font-bold uppercase', getClassColor(row.sat)]">{{ row.sat }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile view con stagger por día -->
    <div class="md:hidden space-y-4">
      <div 
        v-for="(dayKey, idx) in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']" 
        :key="dayKey"
        :class="mobileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :style="{ transitionDelay: mobileVisible ? `${idx * 100}ms` : '0ms' }"
        class="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-red-600/30 transition-all duration-500 ease-out"
      >
        <h4 class="text-xl font-black uppercase mb-4 text-red-600 border-b border-red-600/20 pb-2">
          {{ getDayName(dayKey) }}
        </h4>
        <div class="space-y-4">
          <div v-for="(row, i) in schedule" :key="i">
            <div 
              v-if="row[dayKey as keyof ScheduleRow] !== '-'" 
              class="flex justify-between items-center"
            >
              <span class="text-zinc-500 font-bold text-sm">{{ row.time }}</span>
              <span 
                :class="['px-3 py-1 border rounded-full text-[10px] font-black uppercase', getClassColor(row[dayKey as keyof ScheduleRow] as string)]"
              >
                {{ row[dayKey as keyof ScheduleRow] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leyenda con fade -->
    <div
      class="mt-12 flex flex-wrap gap-4 justify-center transition-all duration-700 ease-out"
      :class="legendVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <span class="px-3 py-1 border rounded-full text-xs font-bold uppercase text-zinc-300 border-zinc-300/20 bg-zinc-300/5">Kimono</span>
      <span class="px-3 py-1 border rounded-full text-xs font-bold uppercase text-red-500 border-red-500/20 bg-red-500/10">No-Gi</span>
      <span class="px-3 py-1 border rounded-full text-xs font-bold uppercase text-pink-400 border-pink-400/20 bg-pink-400/10">Femenino</span>
      <span class="px-3 py-1 border rounded-full text-xs font-bold uppercase text-purple-400 border-purple-400/20 bg-purple-400/10">Pro</span>
    </div>

  </div>
</template>