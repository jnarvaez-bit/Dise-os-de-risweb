<script setup lang="ts">
import { Check, FileText, Info } from 'lucide-vue-next';
import { reactive } from 'vue';
import { toast } from 'vue-sonner';
import Rotulo from '@/components/rw/Rotulo.vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INSUMOS } from '@/datos/ejemplo';
import { fmtTamano } from '@/utils/formato';

const archivos = reactive<Record<string, File | null>>({ I01: null, I02: null });

function cambiar(codigo: string, e: Event) {
    archivos[codigo] = (e.target as HTMLInputElement).files?.[0] ?? null;
}
function validar(codigo: string) {
    // Simulación: no se sube nada.
    toast.success(`${codigo} validado (simulación)`, { description: archivos[codigo]?.name });
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Tesorería › Cargar insumos</h1>
            <Rotulo />
        </div>
        <Alert>
            <Info class="h-4 w-4" />
            <AlertDescription>Demo: los archivos no se suben a ningún servidor. Solo se muestra nombre y tamaño.</AlertDescription>
        </Alert>
        <div class="grid gap-4 md:grid-cols-2">
            <Card v-for="i in INSUMOS" :key="i.codigo">
                <CardHeader>
                    <CardTitle class="text-base">{{ i.nombre }}</CardTitle>
                    <CardDescription>Formatos: .zip o .txt</CardDescription>
                </CardHeader>
                <CardContent class="space-y-3">
                    <div class="space-y-2">
                        <Label :for="`archivo-${i.codigo}`">Archivo {{ i.codigo }}</Label>
                        <Input :id="`archivo-${i.codigo}`" type="file" accept=".zip,.txt" @change="cambiar(i.codigo, $event)" />
                    </div>
                    <p class="flex items-center gap-1 text-sm" aria-live="polite">
                        <template v-if="archivos[i.codigo]"><FileText class="h-4 w-4" /> {{ archivos[i.codigo]?.name }} · {{ fmtTamano(archivos[i.codigo]?.size ?? 0) }}</template>
                        <span v-else class="text-muted-foreground">Ningún archivo seleccionado.</span>
                    </p>
                    <Button :disabled="!archivos[i.codigo]" @click="validar(i.codigo)"><Check class="mr-2 h-4 w-4" />Validar</Button>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
