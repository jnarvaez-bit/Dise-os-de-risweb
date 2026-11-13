<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import ToggleSwitch from 'primevue/toggleswitch';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Rotulo from '@/components/Rotulo.vue';
import { MSG_EJEMPLO, TIPOS_ENTIDAD, useEntidades, type Entidad } from '@/datos/crud';
import { descargarCsv } from '@/utils/formato';

const confirm = useConfirm();
const toast = useToast();
const { filas, filtro, filtradas, abierto, editandoId, form, errores, nuevo, editar, guardar, eliminar } = useEntidades();

function onGuardar() {
    if (guardar()) toast.add({ severity: 'success', summary: 'Entidad guardada', detail: MSG_EJEMPLO, life: 3000 });
}
function onEliminar(e: Entidad) {
    confirm.require({
        header: 'Eliminar entidad',
        message: `¿Eliminar «${e.nombre}»?`,
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Eliminar', severity: 'danger' },
        accept: () => {
            eliminar(e.id);
            toast.add({ severity: 'warn', summary: 'Entidad eliminada', detail: MSG_EJEMPLO, life: 3000 });
        },
    });
}
function exportar() {
    descargarCsv('entidades_ejemplo.csv', ['Código', 'Nombre', 'RUC', 'Tipo', 'Activo'], filtradas.value.map((e) => [e.codigo, e.nombre, e.ruc, e.tipo, e.activo ? 'Sí' : 'No']));
    toast.add({ severity: 'info', summary: 'Descarga de ejemplo', detail: 'entidades_ejemplo.csv', life: 3000 });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Entidades</h1>
            <Rotulo />
        </div>
        <Card>
            <template #content>
                <DataTable :value="filtradas" paginator :rows="10" :rows-per-page-options="[10, 25]" size="small" striped-rows data-key="id">
                    <template #header>
                        <div class="flex flex-wrap items-end gap-3">
                            <div class="flex flex-col gap-1">
                                <label for="buscar-entidad" class="text-sm font-medium">Buscar</label>
                                <InputText id="buscar-entidad" v-model="filtro" placeholder="Código, nombre o RUC" />
                            </div>
                            <span class="text-sm text-muted-color">{{ filtradas.length }} de {{ filas.length }}</span>
                            <div class="ml-auto flex gap-2">
                                <Button label="Exportar Excel" icon="pi pi-file-excel" severity="success" outlined @click="exportar" />
                                <Button label="Nuevo" icon="pi pi-plus" @click="nuevo" />
                            </div>
                        </div>
                    </template>
                    <template #empty>No hay entidades que coincidan con la búsqueda.</template>
                    <Column field="codigo" header="Código" sortable />
                    <Column field="nombre" header="Nombre" sortable />
                    <Column field="ruc" header="RUC" />
                    <Column field="tipo" header="Tipo" sortable />
                    <Column field="activo" header="Estado">
                        <template #body="{ data }"><Tag :value="data.activo ? 'Activo' : 'Inactivo'" :severity="data.activo ? 'success' : 'secondary'" /></template>
                    </Column>
                    <Column header="Acciones" style="width: 120px">
                        <template #body="{ data }">
                            <div class="flex gap-1">
                                <Button v-tooltip.top="'Editar'" icon="pi pi-pencil" text rounded :aria-label="`Editar ${data.nombre}`" @click="editar(data)" />
                                <Button v-tooltip.top="'Eliminar'" icon="pi pi-trash" text rounded severity="danger" :aria-label="`Eliminar ${data.nombre}`" @click="onEliminar(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="abierto" modal :header="editandoId === null ? 'Nueva entidad' : 'Editar entidad'" :style="{ width: '32rem' }">
            <form id="form-entidad" class="space-y-4" novalidate @submit.prevent="onGuardar">
                <div class="flex flex-col gap-1">
                    <label for="ent-codigo" class="text-sm font-medium">Código</label>
                    <InputText id="ent-codigo" v-model="form.codigo" :invalid="!!errores.codigo" fluid />
                    <small v-if="errores.codigo" class="text-red-600" role="alert">{{ errores.codigo }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ent-nombre" class="text-sm font-medium">Nombre</label>
                    <InputText id="ent-nombre" v-model="form.nombre" :invalid="!!errores.nombre" fluid />
                    <small v-if="errores.nombre" class="text-red-600" role="alert">{{ errores.nombre }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ent-ruc" class="text-sm font-medium">RUC</label>
                    <InputText id="ent-ruc" v-model="form.ruc" :invalid="!!errores.ruc" inputmode="numeric" maxlength="13" fluid />
                    <small v-if="errores.ruc" class="text-red-600" role="alert">{{ errores.ruc }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ent-tipo" class="text-sm font-medium">Tipo</label>
                    <Select v-model="form.tipo" input-id="ent-tipo" :options="[...TIPOS_ENTIDAD]" placeholder="Seleccione" :invalid="!!errores.tipo" fluid />
                    <small v-if="errores.tipo" class="text-red-600" role="alert">{{ errores.tipo }}</small>
                </div>
                <div class="flex items-center gap-2">
                    <ToggleSwitch v-model="form.activo" input-id="ent-activo" />
                    <label for="ent-activo" class="text-sm">Activo</label>
                </div>
            </form>
            <template #footer>
                <Button label="Cancelar" severity="secondary" outlined @click="abierto = false" />
                <Button label="Guardar" icon="pi pi-check" type="submit" form="form-entidad" />
            </template>
        </Dialog>
    </div>
</template>
