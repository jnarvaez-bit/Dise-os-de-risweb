<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { generarFilas, TIPOS_REPORTE, type FilaReporte } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const route = useRoute();
const confirm = useConfirm();
const toast = useToast();
const corte = ref<Date | null>(ultimoDiaMesAnterior());
const tipo = ref<string | null>('LIM007');
const filas = ref<FilaReporte[]>(generarFilas());
const cargando = ref(false);

function generar() {
    confirm.require({
        header: 'Confirmar',
        message: `¿Desea generar el reporte ${tipo.value ?? ''} con corte ${fmtFecha(corte.value)}?`,
        icon: 'pi pi-question-circle',
        rejectProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Aceptar' },
        accept: () => {
            cargando.value = true;
            setTimeout(() => {
                filas.value = generarFilas(120, (corte.value?.getMonth() ?? 0) + 3);
                cargando.value = false;
                toast.add({ severity: 'success', summary: 'Reporte generado', detail: 'Datos de ejemplo', life: 3000 });
            }, 400);
        },
        // Cancelar no hace nada.
    });
}

function exportar() {
    descargarCsv(`reporte_${tipo.value}_ejemplo.csv`, ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'], filas.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]));
    toast.add({ severity: 'info', summary: 'Descarga de ejemplo', detail: 'En RiskWeb el Excel lo genera el backend.', life: 4000 });
}
// ?confirmar=1 abre el modal al cargar (solo para la captura del demo).
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
        <Card>
            <template #content>
                <form class="grid items-end gap-4 md:grid-cols-[200px_1fr_auto]" @submit.prevent="generar">
                    <div class="flex flex-col gap-1">
                        <label for="corte" class="text-sm font-medium">Fecha de corte</label>
                        <DatePicker v-model="corte" input-id="corte" date-format="dd/mm/yy" show-icon fluid />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="tipo" class="text-sm font-medium">Tipo de reporte</label>
                        <Select v-model="tipo" input-id="tipo" :options="TIPOS_REPORTE" option-label="label" option-value="value" filter placeholder="Seleccione" fluid />
                    </div>
                    <Button type="submit" label="Generar" icon="pi pi-play" :disabled="!corte || !tipo" />
                </form>
            </template>
        </Card>
        <Card>
            <template #content>
                <DataTable
                    :value="filas"
                    :loading="cargando"
                    paginator
                    :rows="10"
                    :rows-per-page-options="[10, 25, 50]"
                    scrollable
                    scroll-height="420px"
                    sort-mode="single"
                    removable-sort
                    striped-rows
                    size="small"
                    data-key="id"
                    current-page-report-template="{first}–{last} de {totalRecords}"
                    paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                >
                    <template #header>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="font-semibold">Resultado ({{ filas.length }} filas de ejemplo)</span>
                            <Button label="Exportar Excel" icon="pi pi-file-excel" severity="success" outlined size="small" @click="exportar" />
                        </div>
                    </template>
                    <template #empty>No hay datos para el corte seleccionado.</template>
                    <Column field="codigo" header="Código" sortable frozen style="min-width: 100px" />
                    <Column field="indicador" header="Indicador" sortable style="min-width: 280px" />
                    <Column field="valor" header="Valor" sortable style="min-width: 110px" body-class="text-right">
                        <template #body="{ data }">{{ fmtPorcentaje(data.valor) }}</template>
                    </Column>
                    <Column field="limite" header="Límite" sortable style="min-width: 110px" body-class="text-right">
                        <template #body="{ data }">{{ fmtPorcentaje(data.limite) }}</template>
                    </Column>
                    <Column field="sentido" header="Sentido" style="min-width: 120px">
                        <template #body="{ data }">{{ data.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor' }}</template>
                    </Column>
                    <Column field="estado" header="Estado" sortable style="min-width: 120px">
                        <template #body="{ data }"><SemaforoBadge :estado="data.estado" /></template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
