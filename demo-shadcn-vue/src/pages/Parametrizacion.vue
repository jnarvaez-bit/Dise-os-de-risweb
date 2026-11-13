<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { Pencil, Plus } from 'lucide-vue-next';
import { h } from 'vue';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwCampo from '@/components/rw/RwCampo.vue';
import RwDataTable from '@/components/rw/RwDataTable.vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MSG_EJEMPLO, SENTIDOS, useDefiniciones, type Definicion } from '@/datos/crud';
import { fmtNumero } from '@/utils/formato';

const { filas, abierto, editandoId, form, errores, nuevo, editar, guardar } = useDefiniciones();
const der = { clase: 'text-right' };
const pct = (v: number | null) => (v === null ? '—' : `${fmtNumero(v)} %`);

const columnas: ColumnDef<Definicion, any>[] = [
    { accessorKey: 'codigo', header: 'Código' },
    { accessorKey: 'nombre', header: 'Nombre' },
    { accessorKey: 'sentido', header: 'Sentido', cell: ({ row }) => (row.original.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor') },
    { accessorKey: 'l1', header: 'L1', meta: der, cell: ({ row }) => pct(row.original.l1) },
    { accessorKey: 'l2', header: 'L2', meta: der, cell: ({ row }) => pct(row.original.l2) },
    { accessorKey: 'l3', header: 'L3', meta: der, cell: ({ row }) => pct(row.original.l3) },
    {
        id: 'acciones',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => h(Button, { variant: 'ghost', size: 'sm', 'aria-label': `Editar ${row.original.codigo}`, onClick: () => editar(row.original) }, () => [h(Pencil, { class: 'mr-1 h-4 w-4' }), 'Editar']),
    },
];

function onGuardar() {
    const esNueva = editandoId.value === null;
    if (guardar()) toast.success(esNueva ? 'Definición creada' : 'Definición actualizada', { description: MSG_EJEMPLO });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Parametrización</h1>
            <Rotulo />
            <Button class="ml-auto" @click="nuevo"><Plus class="mr-2 h-4 w-4" />Nueva definición</Button>
        </div>
        <Card>
            <CardContent class="pt-6">
                <RwDataTable :datos="filas" :columnas="columnas" />
            </CardContent>
        </Card>

        <Dialog v-model:open="abierto">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{{ editandoId === null ? 'Nueva definición' : 'Editar definición' }}</DialogTitle>
                    <DialogDescription>Umbrales L1 / L2 / L3 en porcentaje. {{ MSG_EJEMPLO }}.</DialogDescription>
                </DialogHeader>
                <form id="form-definicion" class="grid gap-4" novalidate @submit.prevent="onGuardar">
                    <RwCampo id="def-codigo" etiqueta="Código" :error="errores.codigo">
                        <Input id="def-codigo" v-model="form.codigo" maxlength="20" :aria-invalid="!!errores.codigo" />
                    </RwCampo>
                    <RwCampo id="def-nombre" etiqueta="Nombre" :error="errores.nombre">
                        <Input id="def-nombre" v-model="form.nombre" :aria-invalid="!!errores.nombre" />
                    </RwCampo>
                    <RwCampo id="def-sentido" etiqueta="Sentido">
                        <Select v-model="form.sentido">
                            <SelectTrigger id="def-sentido"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="s in SENTIDOS" :key="s.value" :value="s.value">{{ s.label }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </RwCampo>
                    <div class="grid grid-cols-3 gap-3">
                        <RwCampo v-for="k in (['l1', 'l2', 'l3'] as const)" :id="`def-${k}`" :key="k" :etiqueta="`${k.toUpperCase()} (%)`" :error="errores[k]">
                            <Input :id="`def-${k}`" :model-value="form[k] ?? ''" @update:model-value="(v) => (form[k] = v === '' || v === undefined ? null : Number(v))" type="number" step="0.01" min="0" max="100" :aria-invalid="!!errores[k]" />
                        </RwCampo>
                    </div>
                    <Alert v-if="errores.orden" variant="destructive"><AlertDescription>{{ errores.orden }}</AlertDescription></Alert>
                </form>
                <DialogFooter>
                    <Button variant="outline" @click="abierto = false">Cancelar</Button>
                    <Button type="submit" form="form-definicion">Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
