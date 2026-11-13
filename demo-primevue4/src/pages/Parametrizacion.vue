<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import Rotulo from '@/components/Rotulo.vue';
import { MSG_EJEMPLO, SENTIDOS, useDefiniciones } from '@/datos/crud';
import { fmtPorcentaje } from '@/utils/formato';

const toast = useToast();
const d = useDefiniciones();
const { filas, abierto, editandoId, form, errores, nuevo, editar } = d;
function onGuardar() {
    if (d.guardar()) toast.add({ severity: 'success', summary: 'Definición guardada', detail: MSG_EJEMPLO, life: 3000 });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Parametrización</h1>
            <Rotulo />
        </div>
        <Card>
            <template #content>
                <DataTable :value="filas" size="small" data-key="id" striped-rows>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <span class="font-semibold">Umbrales por indicador (ejemplo)</span>
                            <Button label="Nueva definición" icon="pi pi-plus" @click="nuevo" />
                        </div>
                    </template>
                    <Column field="codigo" header="Código" sortable />
                    <Column field="nombre" header="Indicador" />
                    <Column field="sentido" header="Sentido">
                        <template #body="{ data }">{{ data.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor' }}</template>
                    </Column>
                    <Column v-for="k in ['l1', 'l2', 'l3']" :key="k" :field="k" :header="k.toUpperCase()" body-class="text-right">
                        <template #body="{ data }">{{ fmtPorcentaje(data[k]) }}</template>
                    </Column>
                    <Column header="Acciones" style="width: 110px">
                        <template #body="{ data }"><Button label="Editar" icon="pi pi-pencil" text size="small" :aria-label="`Editar ${data.codigo}`" @click="editar(data)" /></template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="abierto" modal :header="editandoId === null ? 'Nueva definición' : 'Editar definición'" :style="{ width: '34rem' }">
            <form id="form-definicion" class="space-y-4" novalidate @submit.prevent="onGuardar">
                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="flex flex-col gap-1">
                        <label for="def-codigo" class="text-sm font-medium">Código</label>
                        <InputText id="def-codigo" v-model="form.codigo" :invalid="!!errores.codigo" fluid />
                        <small v-if="errores.codigo" class="text-red-600" role="alert">{{ errores.codigo }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="def-sentido" class="text-sm font-medium">Sentido</label>
                        <Select v-model="form.sentido" input-id="def-sentido" :options="SENTIDOS" option-label="label" option-value="value" fluid />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="def-nombre" class="text-sm font-medium">Indicador</label>
                    <InputText id="def-nombre" v-model="form.nombre" :invalid="!!errores.nombre" fluid />
                    <small v-if="errores.nombre" class="text-red-600" role="alert">{{ errores.nombre }}</small>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="k in (['l1', 'l2', 'l3'] as const)" :key="k" class="flex flex-col gap-1">
                        <label :for="`def-${k}`" class="text-sm font-medium">{{ k.toUpperCase() }} (%)</label>
                        <InputNumber v-model="form[k]" :input-id="`def-${k}`" :min-fraction-digits="2" :max-fraction-digits="2" locale="es-EC" :invalid="!!errores[k]" fluid />
                        <small v-if="errores[k]" class="text-red-600" role="alert">{{ errores[k] }}</small>
                    </div>
                </div>
                <Message v-if="errores.orden" severity="error">{{ errores.orden }}</Message>
            </form>
            <template #footer>
                <Button label="Cancelar" severity="secondary" outlined @click="abierto = false" />
                <Button label="Guardar" icon="pi pi-check" type="submit" form="form-definicion" />
            </template>
        </Dialog>
    </div>
</template>
