<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fmtFecha } from '@/utils/formato';

const props = defineProps<{ id?: string }>();
const fecha = defineModel<Date | null>({ default: null });

const valor = computed<DateValue | undefined>({
    get: () => (fecha.value ? new CalendarDate(fecha.value.getFullYear(), fecha.value.getMonth() + 1, fecha.value.getDate()) : undefined),
    set: (v) => {
        fecha.value = v ? new Date(v.year, v.month - 1, v.day) : null;
    },
});
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button :id="props.id" variant="outline" class="w-full justify-start font-normal">
                <CalendarIcon class="mr-2 h-4 w-4" aria-hidden="true" />
                {{ fecha ? fmtFecha(fecha) : 'dd/mm/aaaa' }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
            <Calendar v-model="valor" locale="es-EC" :week-starts-on="1" initial-focus />
        </PopoverContent>
    </Popover>
</template>
