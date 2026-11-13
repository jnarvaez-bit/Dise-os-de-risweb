<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { MSG_EJEMPLO, NIVELES, useParametros } from '@/datos/crud';
import { COLORES } from '@/datos/ejemplo';

const toast = useToast();
const p = useParametros();
const { filas, abierto, actual, valor, errores, editar, abiertoColores, colores, erroresColores, editarColores, restaurarColores } = p;

function onGuardar() {
    if (p.guardar()) toast.add({ severity: 'success', summary: 'Parámetro guardado', detail: MSG_EJEMPLO, life: 3000 });
}
function onRestaurar() {
    restaurarColores();
    toast.add({ severity: 'info', summary: 'Valores de ejemplo restaurados', detail: 'Pulse Guardar para aplicarlos.', life: 3000 });
}
function onGuardarColores() {
    if (p.guardarColores()) toast.add({ severity: 'success', summary: 'Colores aplicados al semáforo', detail: MSG_EJEMPLO, life: 3000 });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Parámetros</h1>
            <Rotulo />
        </div>
        <Card>
            <template #title><span class="text-base">Límites colores (L1 / L2 / L3)</span></template>
            <template #content>
                <div class="flex flex-wrap items-center gap-4">
                    <div v-for="n in NIVELES" :key="n.nivel" class="flex items-center gap-2 text-sm">
                        <span class="inline-block h-6 w-6 rounded border" :style="{ background: COLORES[n.estado] }" aria-hidden="true" />
                        <strong>{{ n.nivel }}</strong> {{ COLORES[n.estado] }} <SemaforoBadge :estado="n.estado" />
                    </div>
                    <Button label="Editar colores" icon="pi pi-palette" class="ml-auto" @click="editarColores" />
                </div>
            </template>
        </Card>
        <Card>
            <template #content>
                <DataTable :value="filas" size="small" data-key="id">
                    <Column field="clave" header="Clave" />
                    <Column field="descripcion" header="Descripción" />
                    <Column field="valor" header="Valor">
                        <template #body="{ data }"><code class="break-all text-xs">{{ data.valor }}</code></template>
                    </Column>
                    <Column field="tipo" header="Tipo">
                        <template #body="{ data }"><Tag :value="data.tipo" severity="secondary" /></template>
                    </Column>
                    <Column header="Acciones" style="width: 110px">
                        <template #body="{ data }">
                            <Button label="Editar" icon="pi pi-pencil" text size="small" :aria-label="`Editar ${data.clave}`" @click="editar(data)" />
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

        <Dialog v-model:visible="abierto" modal :header="`Editar parámetro: ${actual?.clave ?? ''}`" :style="{ width: '28rem' }">
            <form id="form-parametro" class="space-y-2" novalidate @submit.prevent="onGuardar">
                <p class="text-sm text-muted-color">{{ actual?.descripcion }}</p>
                <label for="par-valor" class="text-sm font-medium">Valor ({{ actual?.tipo }})</label>
                <InputText id="par-valor" v-model="valor" :invalid="!!errores.valor" fluid />
                <small v-if="errores.valor" class="text-red-600" role="alert">{{ errores.valor }}</small>
            </form>
            <template #footer>
                <Button label="Cancelar" severity="secondary" outlined @click="abierto = false" />
                <Button label="Guardar" icon="pi pi-check" type="submit" form="form-parametro" />
            </template>
        </Dialog>

        <Dialog v-model:visible="abiertoColores" modal header="Editar límites colores" :style="{ width: '30rem' }">
            <form id="form-colores" class="space-y-4" novalidate @submit.prevent="onGuardarColores">
                <div v-for="n in NIVELES" :key="n.nivel" class="flex flex-col gap-1">
                    <label :for="`color-${n.estado}`" class="text-sm font-medium">{{ n.nivel }} · {{ n.nombre }}</label>
                    <div class="flex items-center gap-2">
                        <span class="inline-block h-8 w-8 shrink-0 rounded border" :style="{ background: colores[n.estado] }" aria-hidden="true" />
                        <InputText :id="`color-${n.estado}`" v-model="colores[n.estado]" placeholder="#RRGGBB" :invalid="!!erroresColores[n.estado]" fluid />
                    </div>
                    <small v-if="erroresColores[n.estado]" class="text-red-600" role="alert">{{ erroresColores[n.estado] }}</small>
                </div>
            </form>
            <template #footer>
                <Button label="Restaurar valores de ejemplo" severity="secondary" text @click="onRestaurar" />
                <Button label="Cancelar" severity="secondary" outlined @click="abiertoColores = false" />
                <Button label="Guardar" icon="pi pi-check" type="submit" form="form-colores" />
            </template>
        </Dialog>
    </div>
</template>
