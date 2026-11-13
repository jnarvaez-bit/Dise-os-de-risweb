<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useRoute } from 'vue-router';
import AppLayout from './layouts/AppLayout.vue';

const route = useRoute();
</script>

<template>
    <Toast position="top-right" />
    <ConfirmDialog />
    <router-view v-if="route.meta.publico" />
    <AppLayout v-else>
        <router-view />
    </AppLayout>
</template>
