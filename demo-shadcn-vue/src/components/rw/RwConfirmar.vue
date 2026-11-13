<script setup lang="ts">
// Equivalente a confirmarAccion: Aceptar ejecuta, Cancelar no hace nada. Foco atrapado y Esc cierra (reka-ui).
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

defineProps<{ titulo?: string; mensaje: string }>();
const abierto = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ aceptar: [] }>();
</script>

<template>
    <AlertDialog v-model:open="abierto">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ titulo ?? 'Confirmar' }}</AlertDialogTitle>
                <AlertDialogDescription>{{ mensaje }}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction @click="emit('aceptar')">Aceptar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
