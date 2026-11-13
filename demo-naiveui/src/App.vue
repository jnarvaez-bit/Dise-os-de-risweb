<script setup lang="ts">
import { darkTheme, dateEsAR, esAR, NConfigProvider, NDialogProvider, NMessageProvider, type GlobalThemeOverrides } from 'naive-ui';
import { provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from './layouts/AppLayout.vue';

const route = useRoute();
const oscuro = ref(false);
provide('oscuro', oscuro);
const overrides: GlobalThemeOverrides = { common: { primaryColor: '#0f766e', primaryColorHover: '#115e59', primaryColorPressed: '#134e4a' } };
</script>

<template>
    <!-- esAR es el locale más cercano a es-EC que trae Naive UI. -->
    <NConfigProvider :locale="esAR" :date-locale="dateEsAR" :theme="oscuro ? darkTheme : null" :theme-overrides="overrides" preflight-style-disabled>
        <NMessageProvider>
            <NDialogProvider>
                <router-view v-if="route.meta.publico" />
                <AppLayout v-else>
                    <router-view />
                </AppLayout>
            </NDialogProvider>
        </NMessageProvider>
    </NConfigProvider>
</template>
