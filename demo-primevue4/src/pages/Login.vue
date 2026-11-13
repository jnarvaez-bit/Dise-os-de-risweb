<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { EMPRESA } from '@/datos/ejemplo';

const route = useRoute();
const router = useRouter();
const usuario = ref('');
const clave = ref('');
const error = ref('');
const expirada = computed(() => route.query.expirada === '1');

function ingresar() {
    // Demo: cualquier usuario con clave "demo" entra; si no, muestra el error de ejemplo.
    if (!usuario.value.trim() || !clave.value) {
        error.value = 'Ingrese usuario y contraseña.';
        return;
    }
    if (clave.value !== 'demo') {
        error.value = 'Usuario o contraseña incorrectos (mensaje de ejemplo).';
        return;
    }
    router.push('/tablero');
}
</script>

<template>
    <div class="grid min-h-screen bg-surface-50 md:grid-cols-2 dark:bg-surface-950">
        <div class="hidden flex-col justify-end bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-900 p-10 text-white md:flex">
            <h2 class="text-3xl font-bold">RiskWeb</h2>
            <p class="mt-2 max-w-sm text-white/90">Gestión de riesgos para cooperativas. Imagen genérica de ejemplo.</p>
        </div>
        <div class="flex items-center justify-center p-6">
            <form class="w-full max-w-sm space-y-5" novalidate @submit.prevent="ingresar">
                <div>
                    <h1 class="text-2xl font-bold">Iniciar sesión</h1>
                    <p class="text-sm text-muted-color">{{ EMPRESA }}</p>
                </div>
                <Message v-if="expirada" severity="warn">Su sesión expiró. Vuelva a ingresar.</Message>
                <Message v-if="error" severity="error">{{ error }}</Message>
                <div class="flex flex-col gap-1">
                    <label for="usuario" class="text-sm font-medium">Usuario</label>
                    <InputText id="usuario" v-model="usuario" autocomplete="username" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="clave" class="text-sm font-medium">Contraseña</label>
                    <Password v-model="clave" input-id="clave" :feedback="false" toggle-mask autocomplete="current-password" fluid />
                </div>
                <Button type="submit" label="Ingresar" icon="pi pi-sign-in" class="w-full" />
                <p class="text-center text-xs text-muted-color">Demo con datos de ejemplo · clave: demo</p>
            </form>
        </div>
    </div>
</template>
