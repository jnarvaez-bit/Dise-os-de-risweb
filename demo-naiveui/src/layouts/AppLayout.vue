<script setup lang="ts">
import { NButton, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu, type MenuOption } from 'naive-ui';
import { computed, inject, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { EMPRESA, MENU, type ItemMenu } from '@/datos/ejemplo';

const router = useRouter();
const route = useRoute();
const oscuro = inject<Ref<boolean>>('oscuro', ref(false));
const plegado = ref(false);

function aOpciones(items: ItemMenu[], padre = ''): MenuOption[] {
    return items.map((i, n) => ({
        label: i.label,
        key: i.hijos ? `${padre}g${n}` : `${padre}${n}|${i.to}`,
        children: i.hijos ? aOpciones(i.hijos, `${padre}${n}_`) : undefined,
    }));
}
const opciones = computed(() => aOpciones(MENU));
const activo = computed(() => {
    const buscar = (ops: MenuOption[]): string | null => {
        for (const o of ops) {
            if (o.children) {
                const r = buscar(o.children as MenuOption[]);
                if (r) return r;
            } else if (String(o.key).endsWith(`|${route.path}`)) return String(o.key);
        }
        return null;
    };
    return buscar(opciones.value);
});
function ir(key: string) {
    const to = key.split('|')[1];
    if (to) router.push(to);
}
function alternar() {
    oscuro.value = !oscuro.value;
    document.documentElement.classList.toggle('dark', oscuro.value);
}
</script>

<template>
    <NLayout has-sider style="height: 100vh">
        <NLayoutSider bordered collapse-mode="width" :collapsed-width="0" :width="250" :collapsed="plegado" show-trigger="bar" aria-label="Menú principal" @update:collapsed="plegado = $event">
            <div class="flex h-14 items-center gap-2 px-4 font-bold text-teal-700 dark:text-teal-300">RiskWeb <span class="text-xs font-normal opacity-70">demo</span></div>
            <NMenu :options="opciones" :value="activo" :default-expanded-keys="['g1', 'g2']" @update:value="ir" />
        </NLayoutSider>
        <NLayout>
            <NLayoutHeader bordered class="flex h-14 items-center gap-3 px-4">
                <NButton quaternary aria-label="Plegar menú" @click="plegado = !plegado">☰</NButton>
                <span class="truncate font-semibold">{{ EMPRESA }}</span>
                <span class="ml-auto hidden text-sm opacity-70 sm:inline">usuario.ejemplo · Super Administrador</span>
                <NButton quaternary :aria-label="oscuro ? 'Modo claro' : 'Modo oscuro'" @click="alternar">{{ oscuro ? 'Modo claro' : 'Modo oscuro' }}</NButton>
                <NButton quaternary aria-label="Cerrar sesión" @click="router.push('/login')">Salir</NButton>
            </NLayoutHeader>
            <NLayoutContent content-class="p-4 md:p-6">
                <slot />
            </NLayoutContent>
        </NLayout>
    </NLayout>
</template>
