<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { COLORES, TEXTO_ESTADO, type Estado } from '@/datos/ejemplo';

defineProps<{ estado: Estado }>();
</script>

<template>
    <!-- Siempre con texto; texto oscuro sobre color claro = contraste AA. -->
    <Badge variant="outline" :style="{ background: COLORES[estado], color: '#1f2937', borderColor: 'rgba(0,0,0,.15)' }" :aria-label="`Estado: ${TEXTO_ESTADO[estado]}`">
        {{ TEXTO_ESTADO[estado] }}
    </Badge>
</template>
