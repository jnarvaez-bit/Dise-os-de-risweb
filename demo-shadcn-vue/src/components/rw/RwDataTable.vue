<script setup lang="ts" generic="T">
// Tabla estándar armada con TanStack Table + componentes table de shadcn-vue.
import { FlexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useVueTable, type ColumnDef, type SortingState } from '@tanstack/vue-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{ datos: T[]; columnas: ColumnDef<T, any>[]; vacio?: string }>();
const orden = ref<SortingState>([]);

const tabla = useVueTable({
    get data() {
        return props.datos;
    },
    get columns() {
        return props.columnas;
    },
    state: {
        get sorting() {
            return orden.value;
        },
    },
    onSortingChange: (u) => {
        orden.value = typeof u === 'function' ? u(orden.value) : u;
    },
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
});
</script>

<template>
    <div class="space-y-3">
        <div class="max-h-[420px] overflow-auto rounded-md border">
            <Table>
                <TableHeader class="sticky top-0 z-10 bg-muted">
                    <TableRow v-for="g in tabla.getHeaderGroups()" :key="g.id">
                        <TableHead v-for="h in g.headers" :key="h.id" :class="(h.column.columnDef.meta as any)?.clase">
                            <button
                                v-if="h.column.getCanSort()"
                                type="button"
                                class="inline-flex items-center gap-1 font-medium"
                                :aria-label="`Ordenar por ${String(h.column.columnDef.header)}`"
                                @click="h.column.toggleSorting()"
                            >
                                <FlexRender :render="h.column.columnDef.header" :props="h.getContext()" />
                                <ArrowUp v-if="h.column.getIsSorted() === 'asc'" class="h-3 w-3" />
                                <ArrowDown v-else-if="h.column.getIsSorted() === 'desc'" class="h-3 w-3" />
                                <ArrowUpDown v-else class="h-3 w-3 opacity-50" />
                            </button>
                            <FlexRender v-else :render="h.column.columnDef.header" :props="h.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="tabla.getRowModel().rows.length">
                        <TableRow v-for="r in tabla.getRowModel().rows" :key="r.id">
                            <TableCell v-for="c in r.getVisibleCells()" :key="c.id" class="py-2" :class="(c.column.columnDef.meta as any)?.clase">
                                <FlexRender :render="c.column.columnDef.cell" :props="c.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <TableRow v-else>
                        <TableCell :colspan="columnas.length" class="h-24 text-center">{{ vacio ?? 'Sin datos.' }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <div class="flex flex-wrap items-center justify-end gap-2 text-sm">
            <label class="flex items-center gap-2">
                Filas
                <select
                    class="h-8 rounded-md border bg-background px-2"
                    :value="tabla.getState().pagination.pageSize"
                    @change="tabla.setPageSize(Number(($event.target as HTMLSelectElement).value))"
                >
                    <option v-for="n in [10, 25, 50]" :key="n" :value="n">{{ n }}</option>
                </select>
            </label>
            <span>Página {{ tabla.getState().pagination.pageIndex + 1 }} de {{ tabla.getPageCount() }} · {{ datos.length }} filas</span>
            <Button variant="outline" size="icon" aria-label="Primera página" :disabled="!tabla.getCanPreviousPage()" @click="tabla.setPageIndex(0)"><ChevronsLeft class="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Página anterior" :disabled="!tabla.getCanPreviousPage()" @click="tabla.previousPage()"><ChevronLeft class="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Página siguiente" :disabled="!tabla.getCanNextPage()" @click="tabla.nextPage()"><ChevronRight class="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Última página" :disabled="!tabla.getCanNextPage()" @click="tabla.setPageIndex(tabla.getPageCount() - 1)"><ChevronsRight class="h-4 w-4" /></Button>
        </div>
    </div>
</template>
