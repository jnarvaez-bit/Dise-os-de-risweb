<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { Palette, Pencil, RotateCcw } from 'lucide-vue-next';
import { h } from 'vue';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwCampo from '@/components/rw/RwCampo.vue';
import RwDataTable from '@/components/rw/RwDataTable.vue';
import RwSemaforo from '@/components/rw/RwSemaforo.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MSG_EJEMPLO, NIVELES, useParametros, type Parametro } from '@/datos/crud';
import { COLORES } from '@/datos/ejemplo';

const p = useParametros();
const { filas, abierto, actual, valor, errores, editar, abiertoColores, colores, erroresColores, editarColores, restaurarColores } = p;

const columnas: ColumnDef<Parametro, any>[] = [
    { accessorKey: 'clave', header: 'Clave' },
    { accessorKey: 'descripcion', header: 'Descripción' },
    { accessorKey: 'valor', header: 'Valor', enableSorting: false, cell: ({ row }) => h('code', { class: 'break-all text-xs' }, row.original.valor) },
    { accessorKey: 'tipo', header: 'Tipo', cell: ({ row }) => h(Badge, { variant: 'secondary' }, () => row.original.tipo) },
    {
        id: 'acciones',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => h(Button, { variant: 'ghost', size: 'sm', 'aria-label': `Editar ${row.original.clave}`, onClick: () => editar(row.original) }, () => [h(Pencil, { class: 'mr-1 h-4 w-4' }), 'Editar']),
    },
];

function onGuardar() {
    if (p.guardar()) toast.success('Parámetro guardado', { description: MSG_EJEMPLO });
}
function onRestaurar() {
    restaurarColores();
    toast.info('Valores de ejemplo restaurados', { description: 'Pulse Guardar para aplicarlos.' });
}
function onGuardarColores() {
    if (p.guardarColores()) toast.success('Colores aplicados al semáforo', { description: MSG_EJEMPLO });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Parámetros</h1>
            <Rotulo />
        </div>
        <Card>
            <CardHeader><CardTitle class="text-base">Límites colores (L1 / L2 / L3)</CardTitle></CardHeader>
            <CardContent>
                <div class="flex flex-wrap items-center gap-4">
                    <div v-for="n in NIVELES" :key="n.nivel" class="flex items-center gap-2 text-sm">
                        <span class="inline-block h-6 w-6 rounded border" :style="{ background: COLORES[n.estado] }" aria-hidden="true" />
                        <strong>{{ n.nivel }}</strong> {{ COLORES[n.estado] }} <RwSemaforo :estado="n.estado" />
                    </div>
                    <Button class="ml-auto" @click="editarColores"><Palette class="mr-2 h-4 w-4" />Editar colores</Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent class="pt-6">
                <RwDataTable :datos="filas" :columnas="columnas" />
            </CardContent>
        </Card>

        <Dialog v-model:open="abierto">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Editar parámetro: {{ actual?.clave }}</DialogTitle>
                    <DialogDescription>{{ actual?.descripcion }}</DialogDescription>
                </DialogHeader>
                <form id="form-parametro" novalidate @submit.prevent="onGuardar">
                    <RwCampo id="par-valor" :etiqueta="`Valor (${actual?.tipo ?? ''})`" :error="errores.valor">
                        <Input id="par-valor" v-model="valor" :aria-invalid="!!errores.valor" />
                    </RwCampo>
                </form>
                <DialogFooter>
                    <Button variant="outline" @click="abierto = false">Cancelar</Button>
                    <Button type="submit" form="form-parametro">Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="abiertoColores">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Editar límites colores</DialogTitle>
                    <DialogDescription>Formato #RRGGBB. {{ MSG_EJEMPLO }}.</DialogDescription>
                </DialogHeader>
                <form id="form-colores" class="grid gap-4" novalidate @submit.prevent="onGuardarColores">
                    <RwCampo v-for="n in NIVELES" :id="`color-${n.estado}`" :key="n.nivel" :etiqueta="`${n.nivel} (${n.nombre})`" :error="erroresColores[n.estado]">
                        <div class="flex items-center gap-2">
                            <span class="inline-block h-9 w-9 shrink-0 rounded border" :style="{ background: /^#[0-9A-Fa-f]{6}$/.test(colores[n.estado]) ? colores[n.estado] : 'transparent' }" aria-hidden="true" />
                            <Input :id="`color-${n.estado}`" v-model="colores[n.estado]" maxlength="7" :aria-invalid="!!erroresColores[n.estado]" />
                        </div>
                    </RwCampo>
                </form>
                <DialogFooter class="gap-2 sm:justify-between">
                    <Button variant="ghost" @click="onRestaurar"><RotateCcw class="mr-2 h-4 w-4" />Restaurar valores de ejemplo</Button>
                    <div class="flex gap-2">
                        <Button variant="outline" @click="abiertoColores = false">Cancelar</Button>
                        <Button type="submit" form="form-colores">Guardar</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
