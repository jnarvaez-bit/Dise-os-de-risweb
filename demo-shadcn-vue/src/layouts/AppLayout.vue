<script setup lang="ts">
import { LogOut, Moon, ShieldCheck, Sun } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from '@/components/ui/sidebar';
import { EMPRESA, MENU } from '@/datos/ejemplo';
import { alternarOscuro } from '@/utils/formato';

const route = useRoute();
const router = useRouter();
const oscuro = ref(false);
</script>

<template>
    <SidebarProvider>
        <Sidebar collapsible="offcanvas" aria-label="Menú principal">
            <SidebarHeader>
                <div class="flex items-center gap-2 px-2 py-1 font-bold"><ShieldCheck class="h-5 w-5" aria-hidden="true" /> RiskWeb <span class="text-xs font-normal text-muted-foreground">demo</span></div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup v-for="g in MENU" :key="g.label">
                    <template v-if="g.hijos">
                        <SidebarGroupLabel>{{ g.label }}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem v-for="h in g.hijos" :key="h.label">
                                    <SidebarMenuButton as-child :is-active="route.path === h.to">
                                        <RouterLink :to="h.to ?? '/'">{{ h.label }}</RouterLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </template>
                    <SidebarMenu v-else>
                        <SidebarMenuItem>
                            <SidebarMenuButton as-child :is-active="route.path === g.to">
                                <RouterLink :to="g.to ?? '/'">{{ g.label }}</RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header class="flex h-14 items-center gap-3 border-b px-4">
                <SidebarTrigger aria-label="Plegar menú" />
                <span class="truncate font-semibold">{{ EMPRESA }}</span>
                <span class="ml-auto hidden text-sm text-muted-foreground sm:inline">usuario.ejemplo · Super Administrador</span>
                <Button variant="ghost" size="icon" :aria-label="oscuro ? 'Modo claro' : 'Modo oscuro'" @click="oscuro = alternarOscuro()">
                    <Sun v-if="oscuro" class="h-4 w-4" /><Moon v-else class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Cerrar sesión" @click="router.push('/login')"><LogOut class="h-4 w-4" /></Button>
            </header>
            <main class="flex-1 p-4 md:p-6">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>
