<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import { reactive } from 'vue';
import Rotulo from '@/components/Rotulo.vue';
import { INSUMOS } from '@/datos/ejemplo';
import { fmtTamano } from '@/utils/formato';

const toast = useToast();
const archivos = reactive<Record<string, File | null>>({ I01: null, I02: null });

function seleccionar(codigo: string, e: FileUploadSelectEvent) {
    const f = (Array.isArray(e.files) ? e.files[0] : e.files) as File | undefined;
    archivos[codigo] = f ?? null;
}

function validar(codigo: string) {
    // Simulación: no se sube nada a ningún servidor.
    toast.add({ severity: 'success', summary: `${codigo} validado (simulación)`, detail: archivos[codigo]?.name, life: 3000 });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Tesorería › Cargar insumos</h1>
            <Rotulo />
        </div>
        <Message severity="info">Demo: los archivos no se suben a ningún servidor. Solo se muestra nombre y tamaño.</Message>
        <div class="grid gap-4 md:grid-cols-2">
            <Card v-for="i in INSUMOS" :key="i.codigo">
                <template #title><span class="text-base">{{ i.nombre }}</span></template>
                <template #subtitle>Formatos: .zip o .txt</template>
                <template #content>
                    <div class="flex flex-col gap-3">
                        <FileUpload mode="basic" :name="i.codigo" accept=".zip,.txt" :auto="false" custom-upload choose-label="Elegir archivo" @select="seleccionar(i.codigo, $event)" />
                        <p class="text-sm" aria-live="polite">
                            <template v-if="archivos[i.codigo]">
                                <i class="pi pi-file" aria-hidden="true" /> {{ archivos[i.codigo]?.name }} · {{ fmtTamano(archivos[i.codigo]?.size ?? 0) }}
                            </template>
                            <span v-else class="text-muted-color">Ningún archivo seleccionado.</span>
                        </p>
                        <Button label="Validar" icon="pi pi-check" :disabled="!archivos[i.codigo]" class="self-start" @click="validar(i.codigo)" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
