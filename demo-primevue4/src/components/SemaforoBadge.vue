<script setup lang="ts">
import Tag from 'primevue/tag';
import { COLORES, TEXTO_ESTADO, type Estado } from '@/datos/ejemplo';

defineProps<{ estado: Estado }>();
</script>

<template>
    <!-- El color nunca es la única señal: siempre lleva texto. Texto oscuro = contraste AA. -->
    <Tag
        :value="TEXTO_ESTADO[estado]"
        :style="{ background: COLORES[estado], color: '#1f2937', border: '1px solid rgba(0,0,0,.15)' }"
        :aria-label="`Estado: ${TEXTO_ESTADO[estado]}`"
    />
</template>
