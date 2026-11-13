<script setup lang="ts">
import { NAlert, NButton, NFormItem, NInput } from 'naive-ui';
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
    if (clave.value !== 'demo') {
        error.value = 'Usuario o contraseña incorrectos (mensaje de ejemplo).';
        return;
    }
    router.push('/tablero');
}
</script>

<template>
    <div class="grid min-h-screen bg-slate-50 md:grid-cols-2">
        <div class="hidden flex-col justify-end bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-900 p-10 text-white md:flex">
            <h2 class="text-3xl font-bold">RiskWeb</h2>
            <p class="mt-2 max-w-sm text-white/90">Gestión de riesgos para cooperativas. Imagen genérica de ejemplo.</p>
        </div>
        <div class="flex items-center justify-center p-6">
            <form class="w-full max-w-sm space-y-4" @submit.prevent="ingresar">
                <div>
                    <h1 class="text-2xl font-bold">Iniciar sesión</h1>
                    <p class="text-sm text-slate-600">{{ EMPRESA }}</p>
                </div>
                <NAlert v-if="expirada" type="warning">Su sesión expiró. Vuelva a ingresar.</NAlert>
                <NAlert v-if="error" type="error">{{ error }}</NAlert>
                <NFormItem label="Usuario" label-placement="top" :show-feedback="false">
                    <NInput v-model:value="usuario" :input-props="{ autocomplete: 'username', id: 'usuario' }" placeholder="" />
                </NFormItem>
                <NFormItem label="Contraseña" label-placement="top" :show-feedback="false">
                    <NInput v-model:value="clave" type="password" show-password-on="click" :input-props="{ autocomplete: 'current-password', id: 'clave' }" placeholder="" />
                </NFormItem>
                <NButton attr-type="submit" type="primary" block>Ingresar</NButton>
                <p class="text-center text-xs text-slate-500">Demo con datos de ejemplo · clave: demo</p>
            </form>
        </div>
    </div>
</template>
