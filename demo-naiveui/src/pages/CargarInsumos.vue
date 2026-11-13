<script setup lang="ts">
import { NAlert, NButton, NCard, NUpload, useMessage, type UploadFileInfo } from 'naive-ui';
import { reactive } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import { INSUMOS } from '@/datos/ejemplo';
import { fmtTamano } from '@/utils/formato';

const message = useMessage();
const archivos = reactive<Record<string, File | null>>({ I01: null, I02: null });

function cambiar(codigo: string, lista: UploadFileInfo[]) {
    archivos[codigo] = lista[0]?.file ?? null;
}
function validar(codigo: string) {
    // Simulación: no se sube nada.
    message.success(`${codigo} validado (simulación): ${archivos[codigo]?.name ?? ''}`);
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Tesorería › Cargar insumos</h1>
            <Rotulo />
        </div>
        <NAlert type="info" :show-icon="true">Demo: los archivos no se suben a ningún servidor. Solo se muestra nombre y tamaño.</NAlert>
        <div class="grid gap-4 md:grid-cols-2">
            <NCard v-for="i in INSUMOS" :key="i.codigo" :title="i.nombre" size="small">
                <p class="mb-3 text-sm opacity-70">Formatos: .zip o .txt</p>
                <NUpload :default-upload="false" :max="1" accept=".zip,.txt" :show-file-list="false" @update:file-list="cambiar(i.codigo, $event)">
                    <NButton>Elegir archivo</NButton>
                </NUpload>
                <p class="my-3 text-sm" aria-live="polite">
                    <template v-if="archivos[i.codigo]">📄 {{ archivos[i.codigo]?.name }} · {{ fmtTamano(archivos[i.codigo]?.size ?? 0) }}</template>
                    <span v-else class="opacity-70">Ningún archivo seleccionado.</span>
                </p>
                <NButton type="primary" :disabled="!archivos[i.codigo]" @click="validar(i.codigo)">✓ Validar</NButton>
            </NCard>
        </div>
    </div>
</template>
