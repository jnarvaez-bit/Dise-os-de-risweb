<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './layouts/AppLayout.vue';

const route = useRoute();
</script>

<template>
    <Toaster position="top-right" rich-colors />
    <router-view v-if="route.meta.publico" />
    <AppLayout v-else>
        <router-view />
    </AppLayout>
</template>
