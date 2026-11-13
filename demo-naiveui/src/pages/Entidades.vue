<script setup lang="ts">
import { NButton, NCard, NDataTable, NFormItem, NInput, NModal, NSelect, NSpace, NSwitch, NTag, useDialog, useMessage, type DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import { MSG_EJEMPLO, TIPOS_ENTIDAD, useEntidades, type Entidad } from '@/datos/crud';
import { descargarCsv } from '@/utils/formato';

const dialog = useDialog();
const message = useMessage();
const { filtro, filtradas, abierto, editandoId, form, errores, nuevo, editar, guardar, eliminar } = useEntidades();
const opcionesTipo = TIPOS_ENTIDAD.map((t) => ({ label: t, value: t }));
const paginacion = { pageSize: 10 };

const columnas: DataTableColumns<Entidad> = [
    { title: 'Código', key: 'codigo', width: 100, sorter: 'default' },
    { title: 'Nombre', key: 'nombre', minWidth: 240, sorter: 'default' },
    { title: 'RUC', key: 'ruc', width: 150 },
    { title: 'Tipo', key: 'tipo', width: 130, sorter: 'default' },
    { title: 'Estado', key: 'activo', width: 100, render: (r) => h(NTag, { size: 'small', type: r.activo ? 'success' : 'default' }, () => (r.activo ? 'Activo' : 'Inactivo')) },
    {
        title: 'Acciones',
        key: 'acciones',
        width: 170,
        render: (r) =>
            h(NSpace, { size: 4 }, () => [
                h(NButton, { size: 'small', quaternary: true, type: 'primary', 'aria-label': `Editar ${r.codigo}`, onClick: () => editar(r) }, () => 'Editar'),
                h(NButton, { size: 'small', quaternary: true, type: 'error', 'aria-label': `Eliminar ${r.codigo}`, onClick: () => pedirEliminar(r) }, () => 'Eliminar'),
            ]),
    },
];

function onGuardar() {
    const esNueva = editandoId.value === null;
    if (guardar()) message.success(`${esNueva ? 'Entidad creada' : 'Entidad actualizada'}. ${MSG_EJEMPLO}`);
}
function pedirEliminar(e: Entidad) {
    dialog.warning({
        title: 'Eliminar entidad',
        content: `¿Eliminar la entidad ${e.codigo} - ${e.nombre}?`,
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        onPositiveClick: () => {
            eliminar(e.id);
            message.success(`Entidad eliminada. ${MSG_EJEMPLO}`);
        },
    });
}
function exportar() {
    descargarCsv('entidades_ejemplo.csv', ['Código', 'Nombre', 'RUC', 'Tipo', 'Activo'], filtradas.value.map((e) => [e.codigo, e.nombre, e.ruc, e.tipo, e.activo ? 'Sí' : 'No']));
    message.info('Descarga de ejemplo: entidades_ejemplo.csv');
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Entidades</h1>
            <Rotulo />
        </div>
        <NCard size="small">
            <div class="mb-3 flex flex-wrap items-center gap-2">
                <NInput v-model:value="filtro" clearable placeholder="Buscar código, nombre, RUC…" class="max-w-xs" :input-props="{ 'aria-label': 'Buscar entidades' }" />
                <NButton secondary type="success" class="ml-auto" @click="exportar">Exportar Excel</NButton>
                <NButton type="primary" @click="nuevo">Nuevo</NButton>
            </div>
            <NDataTable :columns="columnas" :data="filtradas" :pagination="paginacion" :row-key="(r: Entidad) => r.id" size="small" striped>
                <template #empty>No hay entidades que coincidan.</template>
            </NDataTable>
        </NCard>

        <NModal v-model:show="abierto" preset="card" :title="editandoId === null ? 'Nueva entidad' : 'Editar entidad'" style="width: 32rem" :mask-closable="false">
            <form id="form-entidad" novalidate @submit.prevent="onGuardar">
                <p class="mb-3 text-sm text-slate-500">{{ MSG_EJEMPLO }}.</p>
                <NFormItem label="Código" :validation-status="errores.codigo ? 'error' : undefined" :feedback="errores.codigo">
                    <NInput v-model:value="form.codigo" :maxlength="10" :input-props="{ id: 'ent-codigo' }" />
                </NFormItem>
                <NFormItem label="Nombre" :validation-status="errores.nombre ? 'error' : undefined" :feedback="errores.nombre">
                    <NInput v-model:value="form.nombre" :input-props="{ id: 'ent-nombre' }" />
                </NFormItem>
                <NFormItem label="RUC" :validation-status="errores.ruc ? 'error' : undefined" :feedback="errores.ruc">
                    <NInput v-model:value="form.ruc" :maxlength="13" :input-props="{ id: 'ent-ruc', inputmode: 'numeric' }" />
                </NFormItem>
                <NFormItem label="Tipo" :validation-status="errores.tipo ? 'error' : undefined" :feedback="errores.tipo">
                    <NSelect v-model:value="form.tipo" :options="opcionesTipo" placeholder="Seleccione" />
                </NFormItem>
                <NFormItem label="Activo" label-placement="left" :show-feedback="false">
                    <NSwitch v-model:value="form.activo" />
                </NFormItem>
            </form>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="abierto = false">Cancelar</NButton>
                    <NButton type="primary" attr-type="submit" form="form-entidad">Guardar</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>
