<script setup lang="ts">
import { NCard } from 'naive-ui';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { KPIS, TEXTO_ESTADO, type Estado } from '@/datos/ejemplo';
import { fmtNumero, fmtPorcentaje } from '@/utils/formato';

const estados: Estado[] = ['verde', 'amarillo', 'rojo', 'gris'];
const nivel: Record<Estado, string> = { verde: 'L1 · dentro del límite', amarillo: 'L2 · cerca del límite', rojo: 'L3 · fuera del límite', gris: 'sin información' };
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Tablero de límites</h1>
            <Rotulo />
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <NCard v-for="k in KPIS" :key="k.nombre" :title="k.nombre" size="small">
                <template #header-extra><SemaforoBadge :estado="k.estado" /></template>
                <p class="text-3xl font-bold">{{ fmtPorcentaje(k.valor) }}</p>
                <p class="mt-1 text-sm" :class="k.variacion > 0 ? 'text-green-700' : k.variacion < 0 ? 'text-red-700' : 'opacity-70'">
                    {{ k.variacion > 0 ? '▲' : k.variacion < 0 ? '▼' : '■' }} {{ fmtNumero(k.variacion) }} pp vs. mes anterior
                </p>
                <p class="mt-2 text-xs opacity-70">Dato de ejemplo</p>
            </NCard>
        </div>
        <NCard title="Semáforo de límites" size="small">
            <ul class="flex flex-wrap gap-4">
                <li v-for="e in estados" :key="e" class="flex items-center gap-2 text-sm">
                    <SemaforoBadge :estado="e" /> <span>{{ nivel[e] }} ({{ TEXTO_ESTADO[e] }})</span>
                </li>
            </ul>
        </NCard>
    </div>
</template>
