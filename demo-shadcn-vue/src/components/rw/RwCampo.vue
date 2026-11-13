<script setup lang="ts">
// Campo de formulario: etiqueta + control (slot) + mensaje de error accesible.
import { Label } from '@/components/ui/label';

defineProps<{ id: string; etiqueta: string; error?: string }>();
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <Label :for="id">{{ etiqueta }}</Label>
        <slot />
        <p v-if="error" :id="`${id}-error`" class="text-sm text-red-600" role="alert">{{ error }}</p>
    </div>
</template>
