<script setup lang="ts">
import { NTag } from 'naive-ui';
import { COLORES, TEXTO_ESTADO, type Estado } from '@/datos/ejemplo';

defineProps<{ estado: Estado }>();
</script>

<template>
    <!-- Siempre con texto; texto oscuro sobre color claro = contraste AA. -->
    <NTag size="small" :bordered="true" :color="{ color: COLORES[estado], textColor: '#1f2937', borderColor: 'rgba(0,0,0,.15)' }" :aria-label="`Estado: ${TEXTO_ESTADO[estado]}`">
        <strong>{{ TEXTO_ESTADO[estado] }}</strong>
    </NTag>
</template>
