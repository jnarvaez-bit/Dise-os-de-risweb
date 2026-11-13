<script setup lang="ts">
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { EMPRESA, MENU, type ItemMenu } from '@/datos/ejemplo';
import { alternarOscuro } from '@/utils/formato';

const router = useRouter();
const plegado = ref(false);
const oscuro = ref(false);
const iconos: Record<string, string> = {
    Tablero: 'pi pi-chart-bar',
    Administración: 'pi pi-cog',
    Límites: 'pi pi-sliders-h',
    Tesorería: 'pi pi-wallet',
};

function aModelo(items: ItemMenu[], padre = ''): MenuItem[] {
    return items.map((i, n) => ({
        key: `${padre}${n}`,
        label: i.label,
        icon: iconos[i.label],
        command: i.to ? () => router.push(i.to as string) : undefined,
        items: i.hijos ? aModelo(i.hijos, `${padre}${n}_`) : undefined,
    }));
}
const modelo = computed(() => aModelo(MENU));
const expandidas = ref<Record<string, boolean>>({ '1': true, '2': true, '3': true });
</script>

<template>
    <div class="flex min-h-screen bg-surface-50 text-surface-800 dark:bg-surface-950 dark:text-surface-100">
        <aside
            class="border-r border-surface-200 bg-surface-0 transition-all dark:border-surface-800 dark:bg-surface-900"
            :class="plegado ? 'w-0 overflow-hidden md:w-0' : 'w-64'"
            aria-label="Menú principal"
        >
            <div class="flex h-14 items-center gap-2 border-b border-surface-200 px-4 font-bold text-primary dark:border-surface-800">
                <i class="pi pi-shield" aria-hidden="true" /> RiskWeb <span class="text-xs font-normal text-muted-color">demo</span>
            </div>
            <PanelMenu v-model:expandedKeys="expandidas" :model="modelo" class="p-2" />
        </aside>
        <div class="flex min-w-0 flex-1 flex-col">
            <header class="flex h-14 items-center gap-3 border-b border-surface-200 bg-surface-0 px-4 dark:border-surface-800 dark:bg-surface-900">
                <Button icon="pi pi-bars" text rounded aria-label="Plegar menú" @click="plegado = !plegado" />
                <span class="truncate font-semibold">{{ EMPRESA }}</span>
                <span class="ml-auto hidden text-sm text-muted-color sm:inline">usuario.ejemplo · Super Administrador</span>
                <Button
                    :icon="oscuro ? 'pi pi-sun' : 'pi pi-moon'"
                    text
                    rounded
                    :aria-label="oscuro ? 'Modo claro' : 'Modo oscuro'"
                    @click="oscuro = alternarOscuro()"
                />
                <Button icon="pi pi-sign-out" text rounded aria-label="Cerrar sesión" @click="router.push('/login')" />
            </header>
            <main class="flex-1 p-4 md:p-6">
                <slot />
            </main>
        </div>
    </div>
</template>
