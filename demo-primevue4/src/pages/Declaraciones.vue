<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { MSG_EJEMPLO, useDeclaraciones, type Declaracion } from '@/datos/crud';
import { TIPOS_REPORTE } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const confirm = useConfirm();
const toast = useToast();
const { filas, detalleAbierto, actual, detalle, consultar, agregar } = useDeclaraciones();
const corte = ref<Date | null>(ultimoDiaMesAnterior());
const tipo = ref('LIM007');

function nueva() {
    confirm.require({
        header: 'Confirmar',
        message: `¿Generar la declaración ${tipo.value} con corte ${fmtFecha(corte.value)}?`,
        icon: 'pi pi-question-circle',
        rejectProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Aceptar' },
        accept: () => {
            agregar(corte.value ?? new Date(), tipo.value);
            toast.add({ severity: 'success', summary: 'Declaración generada', detail: MSG_EJEMPLO, life: 3000 });
        },
    });
}
function imprimir(d: Declaracion) {
    toast.add({ severity: 'info', summary: 'Imprimir (ejemplo)', detail: `Se abriría la impresión de ${d.tipo} ${fmtFecha(d.corte)}.`, life: 3000 });
}
function excel(d: Declaracion) {
    descargarCsv(`declaracion_${d.tipo}_ejemplo.csv`, ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'], detalle.value.length && actual.value?.id === d.id ? detalle.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]) : [[d.tipo, 'Declaración de ejemplo', '', '', d.estado]]);
    toast.add({ severity: 'info', summary: 'Descarga de ejemplo', detail: `declaracion_${d.tipo}_ejemplo.csv`, life: 3000 });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Declaraciones</h1>
            <Rotulo />
        </div>
        <Card>
            <template #content>
                <form class="grid items-end gap-4 md:grid-cols-[200px_1fr_auto]" @submit.prevent="nueva">
                    <div class="flex flex-col gap-1">
                        <label for="dec-corte" class="text-sm font-medium">Fecha de corte</label>
                        <DatePicker v-model="corte" input-id="dec-corte" date-format="dd/mm/yy" show-icon fluid />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="dec-tipo" class="text-sm font-medium">Tipo</label>
                        <Select v-model="tipo" input-id="dec-tipo" :options="TIPOS_REPORTE" option-label="label" option-value="value" filter fluid />
                    </div>
                    <Button type="submit" label="Nueva declaración" icon="pi pi-plus" :disabled="!corte" />
                </form>
            </template>
        </Card>
        <Card>
            <template #content>
                <DataTable :value="filas" size="small" data-key="id" paginator :rows="10">
                    <template #empty>No hay declaraciones.</template>
                    <Column field="corte" header="Corte" sortable>
                        <template #body="{ data }">{{ fmtFecha(data.corte) }}</template>
                    </Column>
                    <Column field="tipo" header="Tipo" sortable />
                    <Column field="estado" header="Estado">
                        <template #body="{ data }"><Tag :value="data.estado" :severity="data.estado === 'Enviada' ? 'success' : 'info'" /></template>
                    </Column>
                    <Column field="usuario" header="Usuario" />
                    <Column header="Acciones" style="width: 160px">
                        <template #body="{ data }">
                            <div class="flex gap-1">
                                <Button v-tooltip.top="'Consultar'" icon="pi pi-eye" text rounded :aria-label="`Consultar ${data.tipo}`" @click="consultar(data)" />
                                <Button v-tooltip.top="'Imprimir'" icon="pi pi-print" text rounded :aria-label="`Imprimir ${data.tipo}`" @click="imprimir(data)" />
                                <Button v-tooltip.top="'Excel'" icon="pi pi-file-excel" text rounded severity="success" :aria-label="`Excel ${data.tipo}`" @click="excel(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="detalleAbierto" modal :header="`Declaración ${actual?.tipo ?? ''} · corte ${fmtFecha(actual?.corte)}`" :style="{ width: '52rem' }">
            <DataTable :value="detalle" size="small" data-key="id">
                <Column field="codigo" header="Código" />
                <Column field="indicador" header="Indicador" />
                <Column field="valor" header="Valor" body-class="text-right"><template #body="{ data }">{{ fmtPorcentaje(data.valor) }}</template></Column>
                <Column field="limite" header="Límite" body-class="text-right"><template #body="{ data }">{{ fmtPorcentaje(data.limite) }}</template></Column>
                <Column field="estado" header="Estado"><template #body="{ data }"><SemaforoBadge :estado="data.estado" /></template></Column>
            </DataTable>
            <template #footer>
                <Button v-if="actual" label="Imprimir" icon="pi pi-print" severity="secondary" outlined @click="imprimir(actual)" />
                <Button v-if="actual" label="Excel" icon="pi pi-file-excel" severity="success" outlined @click="excel(actual)" />
                <Button label="Cerrar" @click="detalleAbierto = false" />
            </template>
        </Dialog>
    </div>
</template>
