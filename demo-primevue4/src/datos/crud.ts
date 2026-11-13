// Lógica de ejemplo (sin librería de UI): estado, validaciones y acciones simuladas.
// Nada se guarda: al recargar la página vuelve a los datos de ejemplo.
import { computed, reactive, ref } from 'vue';
import { COLORES, generarFilas, TIPOS_REPORTE, type Estado } from './ejemplo';

export const MSG_EJEMPLO = 'Ejemplo: no se guardan datos';
export type Errores = Record<string, string>;
const hayErrores = (e: Errores) => Object.keys(e).length > 0;

// ---------- Entidades ----------
export const TIPOS_ENTIDAD = ['Banco', 'Cooperativa', 'Mutualista', 'Otra'] as const;
export interface Entidad {
    id: number;
    codigo: string;
    nombre: string;
    ruc: string;
    tipo: string;
    activo: boolean;
}

function entidadesEjemplo(): Entidad[] {
    const base = [
        ['BEJ01', 'Banco Ejemplo Uno S.A.', 'Banco'],
        ['BEJ02', 'Banco Ejemplo Dos S.A.', 'Banco'],
        ['BEJ03', 'Banco Ficticio del Sur S.A.', 'Banco'],
        ['CEJ01', 'Cooperativa Ejemplo Alfa Ltda.', 'Cooperativa'],
        ['CEJ02', 'Cooperativa Ejemplo Beta Ltda.', 'Cooperativa'],
        ['CEJ03', 'Cooperativa Ficticia Gamma Ltda.', 'Cooperativa'],
        ['CEJ04', 'Cooperativa Ficticia Delta Ltda.', 'Cooperativa'],
        ['MEJ01', 'Mutualista Ejemplo Norte', 'Mutualista'],
        ['MEJ02', 'Mutualista Ejemplo Centro', 'Mutualista'],
        ['OEJ01', 'Fondo Ficticio de Inversión', 'Otra'],
        ['OEJ02', 'Casa de Valores Ejemplo S.A.', 'Otra'],
        ['OEJ03', 'Emisor Ficticio Corporativo S.A.', 'Otra'],
    ];
    return base.map(([codigo, nombre, tipo], i) => ({
        id: i + 1,
        codigo,
        nombre,
        ruc: `09900000${String(i + 1).padStart(2, '0')}001`,
        tipo,
        activo: i % 5 !== 4,
    }));
}

export function validarEntidad(f: Omit<Entidad, 'id'>, todas: Entidad[], id: number | null): Errores {
    const e: Errores = {};
    if (!/^[A-Z0-9]{3,10}$/.test(f.codigo.trim())) e.codigo = 'Código obligatorio: 3 a 10 letras mayúsculas o números.';
    else if (todas.some((x) => x.codigo === f.codigo.trim() && x.id !== id)) e.codigo = 'Ese código ya existe.';
    if (f.nombre.trim().length < 3) e.nombre = 'Nombre obligatorio (mínimo 3 caracteres).';
    if (!/^\d{13}$/.test(f.ruc.trim())) e.ruc = 'El RUC debe tener 13 dígitos.';
    if (!f.tipo) e.tipo = 'Seleccione el tipo.';
    return e;
}

export function useEntidades() {
    const filas = ref<Entidad[]>(entidadesEjemplo());
    const filtro = ref('');
    const filtradas = computed(() => {
        const q = filtro.value.trim().toLowerCase();
        return q ? filas.value.filter((x) => `${x.codigo} ${x.nombre} ${x.ruc} ${x.tipo}`.toLowerCase().includes(q)) : filas.value;
    });
    const abierto = ref(false);
    const editandoId = ref<number | null>(null);
    const vacio = (): Omit<Entidad, 'id'> => ({ codigo: '', nombre: '', ruc: '', tipo: '', activo: true });
    const form = reactive(vacio());
    const errores = ref<Errores>({});
    function nuevo() {
        Object.assign(form, vacio());
        editandoId.value = null;
        errores.value = {};
        abierto.value = true;
    }
    function editar(x: Entidad) {
        const { id, ...resto } = x;
        Object.assign(form, resto);
        editandoId.value = id;
        errores.value = {};
        abierto.value = true;
    }
    function guardar(): boolean {
        errores.value = validarEntidad(form, filas.value, editandoId.value);
        if (hayErrores(errores.value)) return false;
        const datos = { ...form, codigo: form.codigo.trim(), nombre: form.nombre.trim(), ruc: form.ruc.trim() };
        if (editandoId.value === null) filas.value = [{ id: Date.now(), ...datos }, ...filas.value];
        else filas.value = filas.value.map((x) => (x.id === editandoId.value ? { id: x.id, ...datos } : x));
        abierto.value = false;
        return true;
    }
    function eliminar(id: number) {
        filas.value = filas.value.filter((x) => x.id !== id);
    }
    return { filas, filtro, filtradas, abierto, editandoId, form, errores, nuevo, editar, guardar, eliminar };
}

// ---------- Parámetros ----------
export interface Parametro {
    id: number;
    clave: string;
    descripcion: string;
    valor: string;
    tipo: 'texto' | 'numero' | 'colores';
}
export const NIVELES: { nivel: string; estado: Estado; nombre: string }[] = [
    { nivel: 'L1', estado: 'verde', nombre: 'verde' },
    { nivel: 'L2', estado: 'amarillo', nombre: 'amarillo' },
    { nivel: 'L3', estado: 'rojo', nombre: 'rojo' },
];

export function validarValorParametro(tipo: Parametro['tipo'], valor: string): Errores {
    const e: Errores = {};
    if (!valor.trim()) e.valor = 'El valor es obligatorio.';
    else if (tipo === 'numero' && !/^-?\d+(\.\d{1,2})?$/.test(valor.trim())) e.valor = 'Debe ser un número (máximo 2 decimales, punto decimal).';
    return e;
}

export function validarColores(c: Record<string, string>): Errores {
    const e: Errores = {};
    for (const n of NIVELES) if (!/^#[0-9A-Fa-f]{6}$/.test((c[n.estado] ?? '').trim())) e[n.estado] = `Color ${n.nivel} inválido: use #RRGGBB.`;
    return e;
}

export function useParametros() {
    const coloresJson = () => JSON.stringify({ rojo: COLORES.rojo, amarillo: COLORES.amarillo, verde: COLORES.verde });
    const filas = ref<Parametro[]>([
        { id: 1, clave: 'param_limites', descripcion: 'Tipo de parametrización de límites (ejemplo)', valor: 'Ris', tipo: 'texto' },
        { id: 2, clave: 'dias_alerta_corte', descripcion: 'Días de alerta antes del corte (ejemplo)', valor: '5', tipo: 'numero' },
        { id: 3, clave: 'moneda', descripcion: 'Moneda de los reportes (ejemplo)', valor: 'USD', tipo: 'texto' },
        { id: 4, clave: 'tolerancia_redondeo', descripcion: 'Tolerancia de redondeo (ejemplo)', valor: '0.01', tipo: 'numero' },
        { id: 5, clave: 'limites_colores', descripcion: 'Colores del semáforo L1/L2/L3 (ejemplo)', valor: coloresJson(), tipo: 'colores' },
    ]);
    // Editor simple
    const abierto = ref(false);
    const actual = ref<Parametro | null>(null);
    const valor = ref('');
    const errores = ref<Errores>({});
    // Editor de colores
    const abiertoColores = ref(false);
    const colores = reactive<Record<string, string>>({ verde: '', amarillo: '', rojo: '' });
    const erroresColores = ref<Errores>({});

    function editar(p: Parametro) {
        if (p.tipo === 'colores') return editarColores();
        actual.value = p;
        valor.value = p.valor;
        errores.value = {};
        abierto.value = true;
    }
    function guardar(): boolean {
        if (!actual.value) return false;
        errores.value = validarValorParametro(actual.value.tipo, valor.value);
        if (hayErrores(errores.value)) return false;
        const id = actual.value.id;
        filas.value = filas.value.map((x) => (x.id === id ? { ...x, valor: valor.value.trim() } : x));
        abierto.value = false;
        return true;
    }
    function editarColores() {
        Object.assign(colores, { verde: COLORES.verde, amarillo: COLORES.amarillo, rojo: COLORES.rojo });
        erroresColores.value = {};
        abiertoColores.value = true;
    }
    function guardarColores(): boolean {
        erroresColores.value = validarColores(colores);
        if (hayErrores(erroresColores.value)) return false;
        COLORES.verde = colores.verde.trim().toUpperCase();
        COLORES.amarillo = colores.amarillo.trim().toUpperCase();
        COLORES.rojo = colores.rojo.trim().toUpperCase();
        filas.value = filas.value.map((x) => (x.tipo === 'colores' ? { ...x, valor: coloresJson() } : x));
        abiertoColores.value = false;
        return true;
    }
    function restaurarColores() {
        Object.assign(colores, { verde: '#C6E0B4', amarillo: '#FFFF99', rojo: '#FF7C80' });
        erroresColores.value = {};
    }
    return { filas, abierto, actual, valor, errores, editar, guardar, abiertoColores, colores, erroresColores, editarColores, guardarColores, restaurarColores };
}

// ---------- Parametrización de límites (umbrales L1/L2/L3) ----------
export interface Definicion {
    id: number;
    codigo: string;
    nombre: string;
    sentido: 'mayor_mejor' | 'menor_mejor';
    l1: number | null;
    l2: number | null;
    l3: number | null;
}
export const SENTIDOS = [
    { label: 'Mayor es mejor', value: 'mayor_mejor' },
    { label: 'Menor es mejor', value: 'menor_mejor' },
];

export function validarDefinicion(f: Omit<Definicion, 'id'>): Errores {
    const e: Errores = {};
    if (!/^[A-Z0-9_]{3,20}$/.test(f.codigo.trim())) e.codigo = 'Código obligatorio: 3 a 20 mayúsculas, números o _.';
    if (f.nombre.trim().length < 3) e.nombre = 'Nombre obligatorio.';
    for (const k of ['l1', 'l2', 'l3'] as const) {
        const v = f[k];
        if (v === null || Number.isNaN(v)) e[k] = 'Obligatorio.';
        else if (v < 0 || v > 100) e[k] = 'Entre 0 y 100.';
    }
    if (!e.l1 && !e.l2 && !e.l3) {
        const [a, b, c] = [f.l1 as number, f.l2 as number, f.l3 as number];
        const ok = f.sentido === 'mayor_mejor' ? a >= b && b >= c : a <= b && b <= c;
        if (!ok) e.orden = f.sentido === 'mayor_mejor' ? 'Mayor es mejor: L1 ≥ L2 ≥ L3.' : 'Menor es mejor: L1 ≤ L2 ≤ L3.';
    }
    return e;
}

export function useDefiniciones() {
    const nombres = ['LIQ_PRIMERA_LINEA', 'LIQ_SEGUNDA_LINEA', 'CONC_DEPOSITOS', 'CONC_CARTERA', 'MOROSIDAD_TOTAL', 'SOLVENCIA', 'COBERTURA', 'INV_EMISOR'];
    const filas = ref<Definicion[]>(
        nombres.map((codigo, i) => {
            const mayor = i % 3 !== 2;
            return {
                id: i + 1,
                codigo,
                nombre: `${codigo.replace(/_/g, ' ').toLowerCase()} (ejemplo)`,
                sentido: mayor ? 'mayor_mejor' : 'menor_mejor',
                l1: mayor ? 20 : 5,
                l2: mayor ? 15 : 8,
                l3: mayor ? 10 : 12,
            };
        }),
    );
    const abierto = ref(false);
    const editandoId = ref<number | null>(null);
    const vacio = (): Omit<Definicion, 'id'> => ({ codigo: '', nombre: '', sentido: 'mayor_mejor', l1: null, l2: null, l3: null });
    const form = reactive(vacio());
    const errores = ref<Errores>({});
    function nuevo() {
        Object.assign(form, vacio());
        editandoId.value = null;
        errores.value = {};
        abierto.value = true;
    }
    function editar(d: Definicion) {
        const { id, ...resto } = d;
        Object.assign(form, resto);
        editandoId.value = id;
        errores.value = {};
        abierto.value = true;
    }
    function guardar(): boolean {
        const num = (v: unknown) => (v === '' || v === null || v === undefined ? null : Number(v));
        const datos = { ...form, codigo: form.codigo.trim(), l1: num(form.l1), l2: num(form.l2), l3: num(form.l3) };
        errores.value = validarDefinicion(datos);
        if (hayErrores(errores.value)) return false;
        if (editandoId.value === null) filas.value = [...filas.value, { id: Date.now(), ...datos }];
        else filas.value = filas.value.map((x) => (x.id === editandoId.value ? { id: x.id, ...datos } : x));
        abierto.value = false;
        return true;
    }
    return { filas, abierto, editandoId, form, errores, nuevo, editar, guardar };
}

// ---------- Declaraciones ----------
export interface Declaracion {
    id: number;
    corte: Date;
    tipo: string;
    estado: 'Generada' | 'Enviada';
    usuario: string;
}

export function useDeclaraciones() {
    const filas = ref<Declaracion[]>(
        Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            corte: new Date(2026, 10 - i, 0),
            tipo: TIPOS_REPORTE[i % TIPOS_REPORTE.length].value,
            estado: i < 2 ? 'Generada' : 'Enviada',
            usuario: 'usuario.ejemplo',
        })),
    );
    const detalleAbierto = ref(false);
    const actual = ref<Declaracion | null>(null);
    const detalle = computed(() => (actual.value ? generarFilas(8, actual.value.id + 11) : []));
    function consultar(d: Declaracion) {
        actual.value = d;
        detalleAbierto.value = true;
    }
    function agregar(corte: Date, tipo: string) {
        filas.value = [{ id: Date.now(), corte, tipo, estado: 'Generada', usuario: 'usuario.ejemplo' }, ...filas.value];
    }
    return { filas, detalleAbierto, actual, detalle, consultar, agregar };
}
