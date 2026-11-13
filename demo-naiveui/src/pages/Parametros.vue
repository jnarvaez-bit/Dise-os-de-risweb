<script setup lang="ts">
import { NButton, NCard, NDataTable, NFormItem, NInput, NModal, NTag, useMessage, type DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import SemaforoBadge from '@/components/SemaforoBadge.vue';
import { MSG_EJEMPLO, NIVELES, useParametros, type Parametro } from '@/datos/crud';
import { COLORES } from '@/datos/ejemplo';

const message = useMessage();
const p = useParametros();
const { filas, abierto, actual, valor, errores, editar, abiertoColores, colores, erroresColores, editarColores, restaurarColores } = p;
const hexOk = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

const columnas: DataTableColumns<Parametro> = [
    { title: 'Clave', key: 'clave', width: 190 },
    { title: 'Descripción', key: 'descripcion', minWidth: 240 },
    { title: 'Valor', key: 'valor', minWidth: 200, render: (r) => h('code', { class: 'break-all text-xs' }, r.valor) },
    { title: 'Tipo', key: 'tipo', width: 100, render: (r) => h(NTag, { size: 'small' }, () => r.tipo) },
    { title: 'Acciones', key: 'acciones', width: 100, render: (r) => h(NButton, { size: 'small', quaternary: true, type: 'primary', 'aria-label': `Editar ${r.clave}`, onClick: () => editar(r) }, () => 'Editar') },
];

function onGuardar() {
    if (p.guardar()) message.success(`Parámetro guardado. ${MSG_EJEMPLO}`);
}
function onRestaurar() {
    restaurarColores();
    message.info('Valores de ejemplo restaurados: pulse Guardar para aplicarlos.');
}
function onGuardarColores() {
    if (p.guardarColores()) message.success(`Colores aplicados al semáforo. ${MSG_EJEMPLO}`);
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Administración › Parámetros</h1>
            <Rotulo />
        </div>
        <NCard size="small" title="Límites colores (L1 / L2 / L3)">
            <div class="flex flex-wrap items-center gap-4">
                <div v-for="n in NIVELES" :key="n.nivel" class="flex items-center gap-2 text-sm">
                    <span class="inline-block h-6 w-6 rounded border" :style="{ background: COLORES[n.estado] }" aria-hidden="true" />
                    <strong>{{ n.nivel }}</strong> {{ COLORES[n.estado] }} <SemaforoBadge :estado="n.estado" />
                </div>
                <NButton type="primary" class="ml-auto" @click="editarColores">Editar colores</NButton>
            </div>
        </NCard>
        <NCard size="small">
            <NDataTable :columns="columnas" :data="filas" :row-key="(r: Parametro) => r.id" size="small" striped>
                <template #empty>No hay parámetros.</template>
            </NDataTable>
        </NCard>

        <NModal v-model:show="abierto" preset="card" :title="`Editar parámetro: ${actual?.clave ?? ''}`" style="width: 28rem" :mask-closable="false">
            <form id="form-parametro" novalidate @submit.prevent="onGuardar">
                <p class="mb-3 text-sm text-slate-500">{{ actual?.descripcion }}</p>
                <NFormItem :label="`Valor (${actual?.tipo ?? ''})`" :validation-status="errores.valor ? 'error' : undefined" :feedback="errores.valor">
                    <NInput v-model:value="valor" :input-props="{ id: 'par-valor' }" />
                </NFormItem>
            </form>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="abierto = false">Cancelar</NButton>
                    <NButton type="primary" attr-type="submit" form="form-parametro">Guardar</NButton>
                </div>
            </template>
        </NModal>

        <NModal v-model:show="abiertoColores" preset="card" title="Editar límites colores" style="width: 30rem" :mask-closable="false">
            <form id="form-colores" novalidate @submit.prevent="onGuardarColores">
                <p class="mb-3 text-sm text-slate-500">Formato #RRGGBB. {{ MSG_EJEMPLO }}.</p>
                <NFormItem v-for="n in NIVELES" :key="n.nivel" :label="`${n.nivel} (${n.nombre})`" :validation-status="erroresColores[n.estado] ? 'error' : undefined" :feedback="erroresColores[n.estado]">
                    <div class="flex w-full items-center gap-2">
                        <span class="inline-block h-8 w-8 shrink-0 rounded border" :style="{ background: hexOk(colores[n.estado]) ? colores[n.estado] : 'transparent' }" aria-hidden="true" />
                        <NInput v-model:value="colores[n.estado]" :maxlength="7" :input-props="{ id: `color-${n.estado}` }" />
                    </div>
                </NFormItem>
            </form>
            <template #footer>
                <div class="flex flex-wrap justify-between gap-2">
                    <NButton quaternary @click="onRestaurar">Restaurar valores de ejemplo</NButton>
                    <div class="flex gap-2">
                        <NButton @click="abiertoColores = false">Cancelar</NButton>
                        <NButton type="primary" attr-type="submit" form="form-colores">Guardar</NButton>
                    </div>
                </div>
            </template>
        </NModal>
    </div>
</template>
