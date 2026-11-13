<script setup lang="ts">
import { NButton, NCard, NDataTable, NDatePicker, NFormItem, NModal, NSelect, NSpace, NTag, useDialog, useMessage, type DataTableColumns } from 'naive-ui';
import { h, ref } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { MSG_EJEMPLO, useDeclaraciones, type Declaracion } from '@/datos/crud';
import { TIPOS_REPORTE, type FilaReporte } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const dialog = useDialog();
const message = useMessage();
const { filas, detalleAbierto, actual, detalle, consultar, agregar } = useDeclaraciones();
const corte = ref<number | null>(ultimoDiaMesAnterior().getTime());
const tipo = ref<string>('LIM007');

const columnas: DataTableColumns<Declaracion> = [
    { title: 'Corte', key: 'corte', width: 120, sorter: (a, b) => a.corte.getTime() - b.corte.getTime(), render: (r) => fmtFecha(r.corte) },
    { title: 'Tipo', key: 'tipo', width: 110, sorter: 'default' },
    { title: 'Estado', key: 'estado', width: 110, render: (r) => h(NTag, { size: 'small', type: r.estado === 'Enviada' ? 'success' : 'info' }, () => r.estado) },
    { title: 'Usuario', key: 'usuario', minWidth: 140 },
    {
        title: 'Acciones',
        key: 'acciones',
        width: 240,
        render: (r) =>
            h(NSpace, { size: 4 }, () => [
                h(NButton, { size: 'small', quaternary: true, type: 'primary', 'aria-label': `Consultar ${r.tipo}`, onClick: () => consultar(r) }, () => 'Consultar'),
                h(NButton, { size: 'small', quaternary: true, 'aria-label': `Imprimir ${r.tipo}`, onClick: () => imprimir(r) }, () => 'Imprimir'),
                h(NButton, { size: 'small', quaternary: true, type: 'success', 'aria-label': `Excel ${r.tipo}`, onClick: () => excel(r) }, () => 'Excel'),
            ]),
    },
];
const columnasDetalle: DataTableColumns<FilaReporte> = [
    { title: 'Código', key: 'codigo', width: 90 },
    { title: 'Indicador', key: 'indicador', minWidth: 220 },
    { title: 'Valor', key: 'valor', width: 100, align: 'right', render: (r) => fmtPorcentaje(r.valor) },
    { title: 'Límite', key: 'limite', width: 100, align: 'right', render: (r) => fmtPorcentaje(r.limite) },
    { title: 'Estado', key: 'estado', width: 110, render: (r) => h(SemaforoBadge, { estado: r.estado }) },
];

function nueva() {
    const c = corte.value ? new Date(corte.value) : new Date();
    dialog.info({
        title: 'Confirmar',
        content: `¿Generar la declaración ${tipo.value} con corte ${fmtFecha(c)}?`,
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        onPositiveClick: () => {
            agregar(c, tipo.value);
            message.success(`Declaración generada. ${MSG_EJEMPLO}`);
        },
    });
}
function imprimir(d: Declaracion) {
    message.info(`Imprimir (ejemplo): se abriría la impresión de ${d.tipo} ${fmtFecha(d.corte)}.`);
}
function excel(d: Declaracion) {
    descargarCsv(
        `declaracion_${d.tipo}_ejemplo.csv`,
        ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'],
        detalle.value.length && actual.value?.id === d.id ? detalle.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]) : [[d.tipo, 'Declaración de ejemplo', '', '', d.estado]],
    );
    message.info(`Descarga de ejemplo: declaracion_${d.tipo}_ejemplo.csv`);
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Declaraciones</h1>
            <Rotulo />
        </div>
        <NCard size="small">
            <form class="grid items-end gap-4 md:grid-cols-[220px_1fr_auto]" @submit.prevent="nueva">
                <NFormItem label="Fecha de corte" label-placement="top" :show-feedback="false">
                    <NDatePicker v-model:value="corte" type="date" format="dd/MM/yyyy" :input-readonly="false" class="w-full" />
                </NFormItem>
                <NFormItem label="Tipo" label-placement="top" :show-feedback="false">
                    <NSelect v-model:value="tipo" :options="TIPOS_REPORTE" filterable />
                </NFormItem>
                <NButton attr-type="submit" type="primary" :disabled="!corte">Nueva declaración</NButton>
            </form>
        </NCard>
        <NCard size="small">
            <NDataTable :columns="columnas" :data="filas" :pagination="{ pageSize: 10 }" :row-key="(r: Declaracion) => r.id" size="small" striped>
                <template #empty>No hay declaraciones.</template>
            </NDataTable>
        </NCard>

        <NModal v-model:show="detalleAbierto" preset="card" :title="`Declaración ${actual?.tipo ?? ''} · corte ${fmtFecha(actual?.corte ?? null)}`" style="width: 52rem">
            <NDataTable :columns="columnasDetalle" :data="detalle" :row-key="(r: FilaReporte) => r.id" size="small" />
            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton v-if="actual" @click="imprimir(actual)">Imprimir</NButton>
                    <NButton v-if="actual" secondary type="success" @click="excel(actual)">Excel</NButton>
                    <NButton type="primary" @click="detalleAbierto = false">Cerrar</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>
