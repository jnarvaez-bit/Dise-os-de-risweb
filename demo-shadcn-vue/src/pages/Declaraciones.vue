<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { Eye, FileSpreadsheet, Plus, Printer } from 'lucide-vue-next';
import { h, ref } from 'vue';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import RwConfirmar from '@/components/rw/RwConfirmar.vue';
import RwDataTable from '@/components/rw/RwDataTable.vue';
import RwDatePicker from '@/components/rw/RwDatePicker.vue';
import RwSemaforo from '@/components/rw/RwSemaforo.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MSG_EJEMPLO, useDeclaraciones, type Declaracion } from '@/datos/crud';
import { TIPOS_REPORTE } from '@/datos/ejemplo';
import { descargarCsv, fmtFecha, fmtPorcentaje, ultimoDiaMesAnterior } from '@/utils/formato';

const { filas, detalleAbierto, actual, detalle, consultar, agregar } = useDeclaraciones();
const corte = ref<Date | null>(ultimoDiaMesAnterior());
const tipo = ref('LIM007');
const confirmar = ref(false);

const accion = (icono: any, titulo: string, d: Declaracion, fn: (d: Declaracion) => void, clase = '') =>
    h(Button, { variant: 'ghost', size: 'icon', class: clase, title: titulo, 'aria-label': `${titulo} ${d.tipo}`, onClick: () => fn(d) }, () => h(icono, { class: 'h-4 w-4' }));

const columnas: ColumnDef<Declaracion, any>[] = [
    { accessorKey: 'corte', header: 'Corte', cell: ({ row }) => fmtFecha(row.original.corte), sortingFn: (a, b) => a.original.corte.getTime() - b.original.corte.getTime() },
    { accessorKey: 'tipo', header: 'Tipo' },
    { accessorKey: 'estado', header: 'Estado', cell: ({ row }) => h(Badge, { variant: row.original.estado === 'Enviada' ? 'default' : 'secondary' }, () => row.original.estado) },
    { accessorKey: 'usuario', header: 'Usuario', enableSorting: false },
    {
        id: 'acciones',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) =>
            h('div', { class: 'flex gap-1' }, [
                accion(Eye, 'Consultar', row.original, consultar),
                accion(Printer, 'Imprimir', row.original, imprimir),
                accion(FileSpreadsheet, 'Excel', row.original, excel, 'text-green-700'),
            ]),
    },
];

function generar() {
    agregar(corte.value ?? new Date(), tipo.value);
    toast.success('Declaración generada', { description: MSG_EJEMPLO });
}
function imprimir(d: Declaracion) {
    toast.info('Imprimir (ejemplo)', { description: `Se abriría la impresión de ${d.tipo} ${fmtFecha(d.corte)}.` });
}
function excel(d: Declaracion) {
    descargarCsv(
        `declaracion_${d.tipo}_ejemplo.csv`,
        ['Código', 'Indicador', 'Valor', 'Límite', 'Estado'],
        detalle.value.length && actual.value?.id === d.id ? detalle.value.map((f) => [f.codigo, f.indicador, f.valor, f.limite, f.estado]) : [[d.tipo, 'Declaración de ejemplo', '', '', d.estado]],
    );
    toast.info('Descarga de ejemplo', { description: `declaracion_${d.tipo}_ejemplo.csv` });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Declaraciones</h1>
            <Rotulo />
        </div>
        <Card>
            <CardContent class="pt-6">
                <form class="grid items-end gap-4 md:grid-cols-[220px_1fr_auto]" @submit.prevent="confirmar = true">
                    <div class="flex flex-col gap-2">
                        <Label for="dec-corte">Fecha de corte</Label>
                        <RwDatePicker id="dec-corte" v-model="corte" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label for="dec-tipo">Tipo</Label>
                        <Select v-model="tipo">
                            <SelectTrigger id="dec-tipo"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="t in TIPOS_REPORTE" :key="t.value" :value="t.value">{{ t.label }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" :disabled="!corte"><Plus class="mr-2 h-4 w-4" />Nueva declaración</Button>
                </form>
            </CardContent>
        </Card>
        <Card>
            <CardContent class="pt-6">
                <RwDataTable :datos="filas" :columnas="columnas" vacio="No hay declaraciones." />
            </CardContent>
        </Card>

        <Dialog v-model:open="detalleAbierto">
            <DialogContent class="max-h-[90vh] overflow-auto sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Declaración {{ actual?.tipo }} · corte {{ fmtFecha(actual?.corte ?? null) }}</DialogTitle>
                    <DialogDescription>Detalle con datos de ejemplo.</DialogDescription>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Código</TableHead><TableHead>Indicador</TableHead><TableHead class="text-right">Valor</TableHead><TableHead class="text-right">Límite</TableHead><TableHead>Estado</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="f in detalle" :key="f.id">
                            <TableCell>{{ f.codigo }}</TableCell>
                            <TableCell>{{ f.indicador }}</TableCell>
                            <TableCell class="text-right">{{ fmtPorcentaje(f.valor) }}</TableCell>
                            <TableCell class="text-right">{{ fmtPorcentaje(f.limite) }}</TableCell>
                            <TableCell><RwSemaforo :estado="f.estado" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <DialogFooter class="gap-2">
                    <Button v-if="actual" variant="outline" @click="imprimir(actual)"><Printer class="mr-2 h-4 w-4" />Imprimir</Button>
                    <Button v-if="actual" variant="outline" @click="excel(actual)"><FileSpreadsheet class="mr-2 h-4 w-4" />Excel</Button>
                    <Button @click="detalleAbierto = false">Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <RwConfirmar v-model:open="confirmar" :mensaje="`¿Generar la declaración ${tipo} con corte ${fmtFecha(corte)}?`" @aceptar="generar" />
    </div>
</template>
