<script setup lang="ts">
import { NAlert, NButton, NCard, NDataTable, NFormItem, NInput, NInputNumber, NModal, NSelect, useMessage, type DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import { MSG_EJEMPLO, SENTIDOS, useDefiniciones, type Definicion } from '@/datos/crud';
import { fmtNumero } from '@/utils/formato';

const message = useMessage();
const { filas, abierto, editandoId, form, errores, nuevo, editar, guardar } = useDefiniciones();
const pct = (v: number | null) => (v === null ? '—' : `${fmtNumero(v)} %`);
const niveles = ['l1', 'l2', 'l3'] as const;

const columnas: DataTableColumns<Definicion> = [
    { title: 'Código', key: 'codigo', width: 190, sorter: 'default' },
    { title: 'Nombre', key: 'nombre', minWidth: 220 },
    { title: 'Sentido', key: 'sentido', width: 140, render: (r) => (r.sentido === 'mayor_mejor' ? 'Mayor es mejor' : 'Menor es mejor') },
    ...niveles.map((k) => ({ title: k.toUpperCase(), key: k, width: 90, align: 'right' as const, render: (r: Definicion) => pct(r[k]) })),
    { title: 'Acciones', key: 'acciones', width: 100, render: (r) => h(NButton, { size: 'small', quaternary: true, type: 'primary', 'aria-label': `Editar ${r.codigo}`, onClick: () => editar(r) }, () => 'Editar') },
];

function onGuardar() {
    const esNueva = editandoId.value === null;
    if (guardar()) message.success(`${esNueva ? 'Definición creada' : 'Definición actualizada'}. ${MSG_EJEMPLO}`);
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Límites › Parametrización</h1>
            <Rotulo />
            <NButton type="primary" class="ml-auto" @click="nuevo">Nueva definición</NButton>
        </div>
        <NCard size="small">
            <NDataTable :columns="columnas" :data="filas" :row-key="(r: Definicion) => r.id" size="small" striped :scroll-x="900" />
        </NCard>

        <NModal v-model:show="abierto" preset="card" :title="editandoId === null ? 'Nueva definición' : 'Editar definición'" style="width: 34rem" :mask-closable="false">
            <form id="form-definicion" novalidate @submit.prevent="onGuardar">
                <p class="mb-3 text-sm text-slate-500">Umbrales L1 / L2 / L3 en porcentaje. {{ MSG_EJEMPLO }}.</p>
                <NFormItem label="Código" :validation-status="errores.codigo ? 'error' : undefined" :feedback="errores.codigo">
                    <NInput v-model:value="form.codigo" :maxlength="20" :input-props="{ id: 'def-codigo' }" />
                </NFormItem>
                <NFormItem label="Nombre" :validation-status="errores.nombre ? 'error' : undefined" :feedback="errores.nombre">
                    <NInput v-model:value="form.nombre" :input-props="{ id: 'def-nombre' }" />
                </NFormItem>
                <NFormItem label="Sentido">
                    <NSelect v-model:value="form.sentido" :options="SENTIDOS" />
                </NFormItem>
                <div class="grid grid-cols-3 gap-3">
                    <NFormItem v-for="k in niveles" :key="k" :label="`${k.toUpperCase()} (%)`" :validation-status="errores[k] ? 'error' : undefined" :feedback="errores[k]">
                        <NInputNumber v-model:value="form[k]" :min="0" :max="100" :precision="2" :show-button="false" :input-props="{ id: `def-${k}` }" />
                    </NFormItem>
                </div>
                <NAlert v-if="errores.orden" type="error" :show-icon="false">{{ errores.orden }}</NAlert>
            </form>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="abierto = false">Cancelar</NButton>
                    <NButton type="primary" attr-type="submit" form="form-definicion">Guardar</NButton>
                </div>
            </template>
        </NModal>
    </div>
</template>
