<script setup lang="ts">
import Card from 'primevue/card';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import Rotulo from '@/components/Rotulo.vue';
import { KPIS, TEXTO_ESTADO, type Estado } from '@/datos/ejemplo';
import { fmtNumero, fmtPorcentaje } from '@/utils/formato';

const estados: Estado[] = ['verde', 'amarillo', 'rojo', 'gris'];
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Tablero de límites</h1>
            <Rotulo />
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card v-for="k in KPIS" :key="k.nombre">
                <template #title>
                    <div class="flex items-center justify-between text-base">
                        {{ k.nombre }} <SemaforoBadge :estado="k.estado" />
                    </div>
                </template>
                <template #content>
                    <p class="text-3xl font-bold">{{ fmtPorcentaje(k.valor) }}</p>
                    <p class="mt-1 text-sm" :class="k.variacion > 0 ? 'text-green-700 dark:text-green-400' : k.variacion < 0 ? 'text-red-700 dark:text-red-400' : 'text-muted-color'">
                        <i :class="k.variacion > 0 ? 'pi pi-arrow-up' : k.variacion < 0 ? 'pi pi-arrow-down' : 'pi pi-minus'" aria-hidden="true" />
                        {{ fmtNumero(k.variacion) }} pp vs. mes anterior
                    </p>
                    <p class="mt-2 text-xs text-muted-color">Dato de ejemplo</p>
                </template>
            </Card>
        </div>
        <Card>
            <template #title><span class="text-base">Semáforo de límites</span></template>
            <template #content>
                <ul class="flex flex-wrap gap-4">
                    <li v-for="e in estados" :key="e" class="flex items-center gap-2 text-sm">
                        <SemaforoBadge :estado="e" />
                        <span>{{ { verde: 'L1 · dentro del límite', amarillo: 'L2 · cerca del límite', rojo: 'L3 · fuera del límite', gris: 'sin información' }[e] }} ({{ TEXTO_ESTADO[e] }})</span>
                    </li>
                </ul>
            </template>
        </Card>
    </div>
</template>
