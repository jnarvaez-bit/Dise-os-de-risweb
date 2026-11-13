// DATOS FICTICIOS DE EJEMPLO. No provienen de ninguna cooperativa ni de RiskWeb.
import { reactive } from 'vue';

export type Estado = 'verde' | 'amarillo' | 'rojo' | 'gris';

export interface FilaReporte {
    id: number;
    codigo: string;
    indicador: string;
    valor: number | null;
    limite: number;
    sentido: 'mayor_mejor' | 'menor_mejor';
    estado: Estado;
}

export const EMPRESA = 'COOPERATIVA DE EJEMPLO';
export const ROTULO = 'Dato de ejemplo';

// Colores de ejemplo (mismo formato que limites_colores) + gris para "Sin dato".
// Reactivo: si se editan en Parámetros › Límites colores, cambia el semáforo en todo el demo.
export const COLORES: Record<Estado, string> = reactive({
    verde: '#C6E0B4',
    amarillo: '#FFFF99',
    rojo: '#FF7C80',
    gris: '#E5E7EB',
});

export const TEXTO_ESTADO: Record<Estado, string> = {
    verde: 'Cumple',
    amarillo: 'Alerta',
    rojo: 'Incumple',
    gris: 'Sin dato',
};

export const TIPOS_REPORTE = [
    { label: 'LIM007 · Liquidez estructural (ejemplo)', value: 'LIM007' },
    { label: 'LIM008 · Concentración de depósitos (ejemplo)', value: 'LIM008' },
    { label: 'LIM009 · Concentración de cartera (ejemplo)', value: 'LIM009' },
    { label: 'LIM010 · Solvencia (ejemplo)', value: 'LIM010' },
    { label: 'LIM011 · Morosidad (ejemplo)', value: 'LIM011' },
    { label: 'LIM012 · Inversiones por emisor (ejemplo)', value: 'LIM012' },
    { label: 'LIM013 · Brechas de liquidez (ejemplo)', value: 'LIM013' },
    { label: 'LIF · Límites internos de inversión (ejemplo)', value: 'LIF' },
];

const NOMBRES = [
    'Liquidez de primera línea',
    'Liquidez de segunda línea',
    'Concentración 25 mayores depositantes',
    'Concentración 100 mayores depositantes',
    'Concentración 25 mayores deudores',
    'Morosidad cartera total',
    'Morosidad microcrédito',
    'Cobertura de cartera problemática',
    'Solvencia patrimonial',
    'Inversiones en un solo emisor',
    'Activos productivos / pasivos con costo',
    'Brecha acumulada banda 1',
];

// Generador determinístico (siempre los mismos datos).
function aleatorio(semilla: number): () => number {
    let s = semilla;
    return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}

function calcularEstado(valor: number | null, limite: number, sentido: FilaReporte['sentido']): Estado {
    if (valor === null) return 'gris';
    const holgura = sentido === 'mayor_mejor' ? valor - limite : limite - valor;
    if (holgura >= 2) return 'verde';
    if (holgura >= 0) return 'amarillo';
    return 'rojo';
}

export function generarFilas(cantidad = 120, semilla = 7): FilaReporte[] {
    const r = aleatorio(semilla);
    return Array.from({ length: cantidad }, (_, i) => {
        const sentido: FilaReporte['sentido'] = i % 3 === 0 ? 'menor_mejor' : 'mayor_mejor';
        const limite = Math.round((5 + r() * 20) * 100) / 100;
        const valor = i % 17 === 5 ? null : Math.round((limite + (r() - 0.45) * 12) * 100) / 100;
        return {
            id: i + 1,
            codigo: `EJ-${String(i + 1).padStart(3, '0')}`,
            indicador: `${NOMBRES[i % NOMBRES.length]} (ejemplo)`,
            valor,
            limite,
            sentido,
            estado: calcularEstado(valor, limite, sentido),
        };
    });
}

export interface Kpi {
    nombre: string;
    valor: number;
    variacion: number;
    estado: Estado;
}

export const KPIS: Kpi[] = [
    { nombre: 'Liquidez', valor: 24.35, variacion: 1.2, estado: 'verde' },
    { nombre: 'Solvencia', valor: 13.8, variacion: -0.4, estado: 'amarillo' },
    { nombre: 'Morosidad', valor: 6.91, variacion: 0.85, estado: 'rojo' },
    { nombre: 'Concentración', valor: 18.02, variacion: 0, estado: 'gris' },
];

export interface ItemMenu {
    label: string;
    to?: string;
    hijos?: ItemMenu[];
}

export const MENU: ItemMenu[] = [
    { label: 'Tablero', to: '/tablero' },
    {
        label: 'Administración',
        hijos: [
            { label: 'Parámetros', to: '/parametros' },
            { label: 'Entidades', to: '/entidades' },
        ],
    },
    {
        label: 'Límites',
        hijos: [
            { label: 'Reportes', to: '/reportes' },
            { label: 'Declaraciones', to: '/declaraciones' },
            { label: 'Parametrización', to: '/parametrizacion' },
        ],
    },
    { label: 'Tesorería', hijos: [{ label: 'Cargar insumos', to: '/cargar-insumos' }] },
];

export const INSUMOS = [
    { codigo: 'I01', nombre: 'I01 · Estructura de inversiones (ejemplo)' },
    { codigo: 'I02', nombre: 'I02 · Saldos de inversiones (ejemplo)' },
];
