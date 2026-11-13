<script setup lang="ts">
import { Eye, EyeOff, LogIn } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EMPRESA } from '@/datos/ejemplo';

const route = useRoute();
const router = useRouter();
const usuario = ref('');
const clave = ref('');
const ver = ref(false);
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
    <div class="grid min-h-screen bg-muted/40 md:grid-cols-2">
        <div class="hidden flex-col justify-end bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-900 p-10 text-white md:flex">
            <h2 class="text-3xl font-bold">RiskWeb</h2>
            <p class="mt-2 max-w-sm text-white/90">Gestión de riesgos para cooperativas. Imagen genérica de ejemplo.</p>
        </div>
        <div class="flex items-center justify-center p-6">
            <form class="w-full max-w-sm space-y-5" @submit.prevent="ingresar">
                <div>
                    <h1 class="text-2xl font-bold">Iniciar sesión</h1>
                    <p class="text-sm text-muted-foreground">{{ EMPRESA }}</p>
                </div>
                <Alert v-if="expirada" class="border-yellow-300 bg-yellow-50 text-yellow-900"><AlertDescription>Su sesión expiró. Vuelva a ingresar.</AlertDescription></Alert>
                <Alert v-if="error" variant="destructive"><AlertDescription>{{ error }}</AlertDescription></Alert>
                <div class="space-y-2">
                    <Label for="usuario">Usuario</Label>
                    <Input id="usuario" v-model="usuario" autocomplete="username" required />
                </div>
                <div class="space-y-2">
                    <Label for="clave">Contraseña</Label>
                    <div class="relative">
                        <Input id="clave" v-model="clave" :type="ver ? 'text' : 'password'" autocomplete="current-password" required class="pr-10" />
                        <button type="button" class="absolute inset-y-0 right-0 px-3 text-muted-foreground" :aria-label="ver ? 'Ocultar contraseña' : 'Mostrar contraseña'" @click="ver = !ver">
                            <EyeOff v-if="ver" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <Button type="submit" class="w-full"><LogIn class="mr-2 h-4 w-4" />Ingresar</Button>
                <p class="text-center text-xs text-muted-foreground">Demo con datos de ejemplo · clave: demo</p>
            </form>
        </div>
    </div>
</template>
