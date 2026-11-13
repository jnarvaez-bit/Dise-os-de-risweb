<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { FileSpreadsheet, Pencil, Plus, Search, Trash2 } from 'lucide-vue-next';
import { h, ref } from 'vue';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwCampo from '@/components/rw/RwCampo.vue';
import RwConfirmar from '@/components/rw/RwConfirmar.vue';
import RwDataTable from '@/components/rw/RwDataTable.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MSG_EJEMPLO, TIPOS_ENTIDAD, useEntidades, type Entidad } from '@/datos/crud';
import { descargarCsv } from '@/utils/formato';

const { filtro, filtradas, abierto, editandoId, form, errores, nuevo, editar, guardar, eliminar } = useEntidades();
const borrar = ref<Entidad | null>(null);
const confirmarAbierto = ref(false);

const columnas: ColumnDef<Entidad, any>[] = [
    { accessorKey: 'codigo', header: 'Código' },
    { accessorKey: 'nombre', header: 'Nombre' },
    { accessorKey: 'ruc', header: 'RUC', enableSorting: false },
    { accessorKey: 'tipo', header: 'Tipo' },
    { accessorKey: 'activo', header: 'Estado', cell: ({ row }) => h(Badge, { variant: row.original.activo ? 'default' : 'secondary' }, () => (row.original.activo ? 'Activo' : 'Inactivo')) },
    {
        id: 'acciones',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) =>
            h('div', { class: 'flex gap-1' }, [
                h(Button, { variant: 'ghost', size: 'icon', title: 'Editar', 'aria-label': `Editar ${row.original.codigo}`, onClick: () => editar(row.original) }, () => h(Pencil, { class: 'h-4 w-4' })),
                h(Button, { variant: 'ghost', size: 'icon', class: 'text-red-600', title: 'Eliminar', 'aria-label': `Eliminar ${row.original.codigo}`, onClick: () => pedirEliminar(row.original) }, () => h(Trash2, { class: 'h-4 w-4' })),
            ]),
    },
];

function onGuardar() {
    const esNueva = editandoId.value === null;
    if (guardar()) toast.success(esNueva ? 'Entidad creada' : 'Entidad actualizada', { description: MSG_EJEMPLO });
}
function pedirEliminar(e: Entidad) {
    borrar.value = e;
    confirmarAbierto.value = true;
}
function onEliminar() {
    if (!borrar.value) return;
    eliminar(borrar.value.id);
    toast.success('Entidad eliminada', { description: MSG_EJEMPLO });
}
function exportar() {
    descargarCsv('entidades_ejemplo.csv', ['Código', 'Nombre', 'RUC', 'Tipo', 'Activo'], filtradas.value.map((e) => [e.codigo, e.nombre, e.ruc, e.tipo, e.activo ? 'Sí' : 'No']));
    toast.info('Descarga de ejemplo', { description: 'entidades_ejemplo.csv' });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Entidades</h1>
            <Rotulo />
        </div>
        <Card>
            <CardContent class="space-y-4 pt-6">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="relative w-full max-w-xs">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Input v-model="filtro" class="pl-8" placeholder="Buscar código, nombre, RUC…" aria-label="Buscar entidades" />
                    </div>
                    <Button variant="outline" class="ml-auto" @click="exportar"><FileSpreadsheet class="mr-2 h-4 w-4" />Exportar Excel</Button>
                    <Button @click="nuevo"><Plus class="mr-2 h-4 w-4" />Nuevo</Button>
                </div>
                <RwDataTable :datos="filtradas" :columnas="columnas" vacio="No hay entidades que coincidan." />
            </CardContent>
        </Card>

        <Dialog v-model:open="abierto">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{{ editandoId === null ? 'Nueva entidad' : 'Editar entidad' }}</DialogTitle>
                    <DialogDescription>{{ MSG_EJEMPLO }}.</DialogDescription>
                </DialogHeader>
                <form id="form-entidad" class="grid gap-4" novalidate @submit.prevent="onGuardar">
                    <RwCampo id="ent-codigo" etiqueta="Código" :error="errores.codigo">
                        <Input id="ent-codigo" v-model="form.codigo" maxlength="10" :aria-invalid="!!errores.codigo" />
                    </RwCampo>
                    <RwCampo id="ent-nombre" etiqueta="Nombre" :error="errores.nombre">
                        <Input id="ent-nombre" v-model="form.nombre" :aria-invalid="!!errores.nombre" />
                    </RwCampo>
                    <RwCampo id="ent-ruc" etiqueta="RUC" :error="errores.ruc">
                        <Input id="ent-ruc" v-model="form.ruc" inputmode="numeric" maxlength="13" :aria-invalid="!!errores.ruc" />
                    </RwCampo>
                    <RwCampo id="ent-tipo" etiqueta="Tipo" :error="errores.tipo">
                        <Select v-model="form.tipo">
                            <SelectTrigger id="ent-tipo" :aria-invalid="!!errores.tipo"><SelectValue placeholder="Seleccione" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="t in TIPOS_ENTIDAD" :key="t" :value="t">{{ t }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </RwCampo>
                    <div class="flex items-center gap-3">
                        <Switch id="ent-activo" v-model="form.activo" />
                        <Label for="ent-activo">Activo</Label>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="outline" @click="abierto = false">Cancelar</Button>
                    <Button type="submit" form="form-entidad">Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <RwConfirmar v-model:open="confirmarAbierto" titulo="Eliminar entidad" :mensaje="`¿Eliminar la entidad ${borrar?.codigo ?? ''} - ${borrar?.nombre ?? ''}?`" @aceptar="onEliminar" />
    </div>
</template>
