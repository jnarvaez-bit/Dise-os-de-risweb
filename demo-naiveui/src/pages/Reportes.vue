<script setup lang="ts">
import { NButton, NCard, NDataTable, NDatePicker, NFormItem, NSelect, useDialog, useMessage, type DataTableColumns } from 'naive-ui';
import { h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { generarFilas, TIPOS_REPORTE, type FilaReporte } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const route = useRoute();
const dialog = useDialog();
const message = useMessage();
const corte = ref<number | null>(ultimoDiaMesAnterior().getTime());
const tipo = ref<string | null>('LIM007');
const filas = ref<FilaReporte[]>(generarFilas());
const cargando = ref(false);
const orden: Record<string, number> = { rojo: 0, amarillo: 1, verde: 2, gris: 3 };

const columnas: DataTableColumns<FilaReporte> = [
    { title: 'Código', key: 'codigo', fixed: 'left', width: 100, sorter: 'default' },
    { title: 'Indicador', key: 'indicador', minWidth: 280, sorter: 'default' },
    { title: 'Valor', key: 'valor', width: 110, align: 'right', sorter: (a, b) => (a.valor ?? -1) - (b.valor ?? -1), render: (r) => fmtPorcentaje(r.valor) },
    { title: 'Límite', key: 'limite', width: 110, align: 'right', sorter: (a, b) => a.limite - b.limite, render: (r) => fmtPorcentaje(r.limite) },
    { title: 'Sentido', key: 'sentido', width: 140, render: (r) => (r.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor') },
    { title: 'Estado', key: 'estado', width: 120, sorter: (a, b) => orden[a.estado] - orden[b.estado], render: (r) => h(SemaforoBadge, { estado: r.estado }) },
];
const paginacion = { pageSize: 10, showSizePicker: true, pageSizes: [10, 25, 50], prefix: ({ itemCount }: { itemCount?: number }) => `${itemCount ?? 0} filas` };

function generar() {
    dialog.info({
        title: 'Confirmar',
        content: `¿Desea generar el reporte ${tipo.value ?? ''} con corte ${fmtFecha(corte.value ? new Date(corte.value) : null)}?`,
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        autoFocus: true,
        onPositiveClick: () => {
            cargando.value = true;
            setTimeout(() => {
                filas.value = generarFilas(2, new Date(corte.value ?? 0).getMonth() + 3);
                cargando.value = false;
                message.success('Reporte generado (datos de ejemplo)');
            }, 400);
        },
        // Cancelar no hace nada.
    });
}
function exportar() {
    descargarCsv(`reporte_${tipo.value ?? ''}_ejemplo.csv`, ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'], filas.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]));
    message.info('Descarga de ejemplo: en RiskWeb el Excel lo genera el backend.');
}
onMounted(() => {
    if (route.query.confirmar === '1') generar();
});
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Reportes</h1>
            <Rotulo />
        </div>
        <NCard size="small">
            <form class="grid items-end gap-4 md:grid-cols-[220px_1fr_auto]" @submit.prevent="generar">
                <NFormItem label="Fecha de corte" label-placement="top" :show-feedback="false">
                    <NDatePicker v-model:value="corte" type="date" format="dd/MM/yyyy" :input-readonly="false" class="w-full" />
                </NFormItem>
                <NFormItem label="Tipo de reporte" label-placement="top" :show-feedback="false">
                    <NSelect v-model:value="tipo" :options="TIPOS_REPORTE" filterable placeholder="Seleccione" />
                </NFormItem>
                <NButton attr-type="submit" type="primary" :disabled="!corte || !tipo">▶ Generar</NButton>
            </form>
        </NCard>
        <NCard size="small">
            <template #header>Resultado ({{ filas.length }} filas de ejemplo)</template>
            <template #header-extra><NButton secondary type="success" size="small" @click="exportar">Exportar Excel</NButton></template>
            <NDataTable
                :columns="columnas"
                :data="filas"
                :loading="cargando"
                :pagination="paginacion"
                :row-key="(r: FilaReporte) => r.id"
                :max-height="420"
                :scroll-x="900"
                striped
                size="small"
            >
                <template #empty>No hay datos para el corte seleccionado.</template>
            </NDataTable>
        </NCard>
    </div>
</template>
