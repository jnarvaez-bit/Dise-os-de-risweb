<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from 'lucide-vue-next';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwSemaforo from '@/components/rw/RwSemaforo.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <Card v-for="k in KPIS" :key="k.nombre">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-base">{{ k.nombre }}</CardTitle>
                    <RwSemaforo :estado="k.estado" />
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">{{ fmtPorcentaje(k.valor) }}</p>
                    <p class="mt-1 flex items-center gap-1 text-sm" :class="k.variacion > 0 ? 'text-green-700' : k.variacion < 0 ? 'text-red-700' : 'text-muted-foreground'">
                        <ArrowUp v-if="k.variacion > 0" class="h-3 w-3" /><ArrowDown v-else-if="k.variacion < 0" class="h-3 w-3" /><Minus v-else class="h-3 w-3" />
                        {{ fmtNumero(k.variacion) }} pp vs. mes anterior
                    </p>
                    <p class="mt-2 text-xs text-muted-foreground">Dato de ejemplo</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader><CardTitle class="text-base">Semáforo de límites</CardTitle></CardHeader>
            <CardContent>
                <ul class="flex flex-wrap gap-4">
                    <li v-for="e in estados" :key="e" class="flex items-center gap-2 text-sm"><RwSemaforo :estado="e" /> {{ nivel[e] }} ({{ TEXTO_ESTADO[e] }})</li>
                </ul>
            </CardContent>
        </Card>
    </div>
</template>
