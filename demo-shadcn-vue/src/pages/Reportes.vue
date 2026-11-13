<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { FileSpreadsheet, Play } from 'lucide-vue-next';
import { h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwConfirmar from '@/components/rw/RwConfirmar.vue';
import RwDataTable from '@/components/rw/RwDataTable.vue';
import RwDatePicker from '@/components/rw/RwDatePicker.vue';
import RwSemaforo from '@/components/rw/RwSemaforo.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generarFilas, TIPOS_REPORTE, type FilaReporte } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const route = useRoute();
const corte = ref<Date | null>(ultimoDiaMesAnterior());
const tipo = ref<string>('LIM007');
const filas = ref<FilaReporte[]>(generarFilas());
const confirmar = ref(false);
const orden: Record<string, number> = { rojo: 0, amarillo: 1, verde: 2, gris: 3 };
const der = { clase: 'text-right' };

const columnas: ColumnDef<FilaReporte, any>[] = [
    { accessorKey: 'codigo', header: 'Código' },
    { accessorKey: 'indicador', header: 'Indicador' },
    { accessorKey: 'valor', header: 'Valor', meta: der, cell: ({ row }) => fmtPorcentaje(row.original.valor), sortingFn: (a, b) => (a.original.valor ?? -1) - (b.original.valor ?? -1) },
    { accessorKey: 'limite', header: 'Límite', meta: der, cell: ({ row }) => fmtPorcentaje(row.original.limite) },
    { accessorKey: 'sentido', header: 'Sentido', enableSorting: false, cell: ({ row }) => (row.original.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor') },
    { accessorKey: 'estado', header: 'Estado', cell: ({ row }) => h(RwSemaforo, { estado: row.original.estado }), sortingFn: (a, b) => orden[a.original.estado] - orden[b.original.estado] },
];

function generar() {
    filas.value = generarFilas(120, (corte.value?.getMonth() ?? 0) + 3);
    toast.success('Reporte generado', { description: 'Datos de ejemplo' });
}
function exportar() {
    descargarCsv(`reporte_${tipo.value}_ejemplo.csv`, ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'], filas.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]));
    toast.info('Descarga de ejemplo', { description: 'En RiskWeb el Excel lo genera el backend.' });
}
onMounted(() => {
    if (route.query.confirmar === '1') confirmar.value = true;
});
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Reportes</h1>
            <Rotulo />
        </div>
        <Card>
            <CardContent class="pt-6">
                <form class="grid items-end gap-4 md:grid-cols-[220px_1fr_auto]" @submit.prevent="confirmar = true">
                    <div class="flex flex-col gap-2">
                        <Label for="corte">Fecha de corte</Label>
                        <RwDatePicker id="corte" v-model="corte" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label for="tipo">Tipo de reporte</Label>
                        <Select v-model="tipo">
                            <SelectTrigger id="tipo"><SelectValue placeholder="Seleccione" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="t in TIPOS_REPORTE" :key="t.value" :value="t.value">{{ t.label }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" :disabled="!corte || !tipo"><Play class="mr-2 h-4 w-4" />Generar</Button>
                </form>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0">
                <CardTitle class="text-base">Resultado ({{ filas.length }} filas de ejemplo)</CardTitle>
                <Button variant="outline" size="sm" @click="exportar"><FileSpreadsheet class="mr-2 h-4 w-4" />Exportar Excel</Button>
            </CardHeader>
            <CardContent>
                <RwDataTable :datos="filas" :columnas="columnas" vacio="No hay datos para el corte seleccionado." />
            </CardContent>
        </Card>
        <RwConfirmar v-model:open="confirmar" :mensaje="`¿Desea generar el reporte ${tipo} con corte ${fmtFecha(corte)}?`" @aceptar="generar" />
    </div>
</template>
