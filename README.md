# Diseños RiskWeb — 3 demos de librerías de componentes

Repositorio de prueba (privado) con 3 demos **independientes** para elegir la librería de diseño de RiskWeb.
**Todos los datos son ficticios y están rotulados «Dato de ejemplo».** No se conecta a RiskWeb, Molino, Celica ni a ninguna base de datos.

Fecha: 13/11/2026 (hora de Ecuador). Decisión vigente: **PrimeVue 4.5.5 fijo (MIT)**; PrimeVue 5 no es MIT.

## Demos

| Carpeta | Librería | Para qué |
|---|---|---|
| `demo-primevue4/` | PrimeVue 4.5.5 + @primeuix/themes 2.0.3 (Aura, `cssLayer`) | Opción base recomendada |
| `demo-shadcn-vue/` | shadcn-vue 1.0.3 + reka-ui 2.11.0 + @tanstack/vue-table 8.21.3 | Complemento (ya está en RiskWeb: layout/login) |
| `demo-naiveui/` | Naive UI 2.45.3 | Solo para comparar (no recomendada para Tailwind/CSP) |

Las 3 usan Vite 6.4.6 + Vue 3.5.45 + TypeScript 5.8.3 + Tailwind 3.4.17 + vue-router 4.6.4, versiones fijas y `package-lock.json`.

Cada demo tiene las mismas pantallas (rutas con `#`). Menú: **Tablero · Administración (Parámetros, Entidades) · Límites (Reportes, Declaraciones, Parametrización) · Tesorería (Cargar insumos)**. Cada ítem del menú abre su propia pantalla.

| # | Pantalla | Ruta | Qué se puede hacer (todo simulado) |
|---|---|---|---|
| 1 | Login | `#/login?expirada=1` | Usuario + contraseña (mostrar/ocultar). Vacío → «Ingrese usuario y contraseña.»; clave distinta de `demo` → error; `demo` → Tablero. Aviso de sesión expirada. |
| 2 | Layout | todas | Menú lateral plegable, modo oscuro, **Cerrar sesión → login**. |
| 3 | Tablero | `#/tablero` | KPI (Liquidez, Solvencia, Morosidad, Concentración) + semáforo con texto. |
| 4 | Parámetros | `#/parametros` | Tarjeta **Límites colores L1/L2/L3** + «Editar colores» (valida `#RRGGBB`, «Restaurar valores de ejemplo»; al guardar cambia el semáforo en todo el demo). Tabla de parámetros con «Editar» (valida obligatorio y número con 2 decimales). |
| 5 | Entidades | `#/entidades` | CRUD: buscar, «Exportar Excel» (CSV), «Nuevo»/«Editar» en modal con validación (código 3–10 mayúsculas/números y único, nombre ≥ 3, RUC 13 dígitos, tipo), «Eliminar» con confirmación. |
| 6 | Reportes | `#/reportes` | Fecha de corte dd/mm/aaaa + tipo (LIM007…LIM013, LIF) + Generar con confirmación (`?confirmar=1` la abre al cargar); tabla 120 filas, paginación 10/25/50, orden, números es-EC; «Exportar Excel» descarga CSV. |
| 7 | Declaraciones | `#/declaraciones` | «Nueva declaración» con confirmación; por fila Consultar (modal con detalle), Imprimir (aviso) y Excel (CSV). |
| 8 | Parametrización | `#/parametrizacion` | Umbrales L1/L2/L3 por indicador: «Nueva definición»/«Editar» con validación (0–100; mayor es mejor L1 ≥ L2 ≥ L3, menor es mejor L1 ≤ L2 ≤ L3). |
| 9 | Cargar insumos | `#/cargar-insumos` | I01/I02 (.zip/.txt): nombre y tamaño, «Validar» simulado (no sube nada). |

Nada se guarda: cada acción muestra «Ejemplo: no se guardan datos» y al recargar vuelven los datos de ejemplo. «Excel» descarga un CSV de ejemplo (en RiskWeb el Excel real lo hace el backend).

## Cómo correr un demo

```bash
cd demo-primevue4      # o demo-shadcn-vue / demo-naiveui
npm ci                 # instala exactamente lo del package-lock.json
npm run dev            # abre http://localhost:5173/#/login?expirada=1
npm run build          # vue-tsc + vite build -> dist/
npm run preview        # sirve dist/
```

Requisitos: Node 20.19+ (probado con Node 24.22.1).

## Resultado del build (13/11/2026)

| Demo | `npm run build` | dist total |
|---|---|---|
| PrimeVue 4 | ✅ sin errores TS | 1,8 MB (incluye 618 KB de primeicons) |
| shadcn-vue | ✅ sin errores TS | 624 KB |
| Naive UI | ✅ sin errores TS | 1,1 MB |

`npm audit --omit=dev`: 0 vulnerabilidades en los 3.

## Prueba automática de botones (Playwright)

```bash
cd scripts && npm ci
(cd ../demo-primevue4 && npm run build)   # igual para los otros 2: la prueba usa dist/
npm run test        # node test-botones.mjs [demo...]  -> docs/prueba-botones.md y .json
npm run capturas    # node capturas.mjs                -> docs/capturas/*.png
```

Usa `playwright-core` 1.65.0 con Google Chrome del sistema (`/usr/bin/google-chrome` o variable `CHROME_PATH`). Para cada demo: visita las 8 rutas, hace clic en cada botón/enlace/ítem de menú/combo/encabezado ordenable visible y, si se abre un modal, en cada botón del modal. **Falla** si un clic no tiene efecto visible (cambio en la pantalla, navegación, descarga, modal nuevo o selector de archivo) o si hay errores en la consola.

Resultado (13/11/2026, hora de Ecuador) — detalle por botón en `docs/prueba-botones.md`:

| Demo | Resultado | Rutas | Clics OK | Fallas | Deshabilitados* | Errores consola |
|---|---|---|---|---|---|---|
| PrimeVue 4 | ✅ PASA | 8 | 117 | 0 | 2 | 0 |
| shadcn-vue | ✅ PASA | 8 | 116 | 0 | 16 | 0 |
| Naive UI | ✅ PASA | 8 | 119 | 0 | 4 | 0 |

\* Deshabilitados a propósito (p. ej. «Página anterior» en la página 1, «Validar» sin archivo).

## Capturas

En `docs/capturas/` (1366×900), por demo (`<demo>` = `demo-primevue4`, `demo-shadcn-vue`, `demo-naiveui`): `_login`, `_tablero`, `_parametros`, `_parametros-colores`, `_entidades`, `_entidades-validacion`, `_reportes`, `_confirmacion`, `_declaraciones`, `_parametrizacion`, `_cargar-insumos` (`.png`). Se regeneran con `npm run capturas` en `scripts/`.

## Hallazgos

- **PrimeVue 4**: tabla, fechas, confirmación y carga salen listas; `cssLayer` convive con Tailwind 3 sin `!important`. Hay que cargar el locale en español a mano (`src/locale-es.ts`).
- **shadcn-vue 1.0.3**: el registro en línea ya entrega sintaxis de Tailwind 4 (`w-(--x)`); hubo que corregir 3 archivos a `w-[--x]`. También instaló `tailwind-merge@3` (es para Tailwind 4) y `lucide-vue-next@1.0.0` (deprecado); se fijaron `2.6.1` y `0.468.0`. La tabla hay que armarla.
- **Naive UI**: la tabla más completa sin código extra, pero estilos en tiempo de ejecución (CSP con `unsafe-inline`) y look propio.

## Reglas

- git push solo con autorización de Jhon y solo la rama `demos-ui-2026-11-13`.
- No copiar nada de aquí a RiskWeb sin pasar por Molino/pruebas primero.

## Checklist de QA (de `04_Opiniones_equipo_y_checklist.md`)

Probar los 3 demos sobre la misma pantalla (Declaraciones/Reportes). Si una opción falla accesibilidad o tablas, se descarta.

### Checklist de QA (PASS/FAIL + evidencia: URL, captura, código HTTP)
**Accesibilidad**
- [ ] Todo se usa con teclado (Tab, Enter, Esc)
- [ ] Todos los campos tienen etiqueta
- [ ] El foco queda dentro del modal y vuelve al cerrar
- [ ] Contraste AA; el color nunca es la única señal (semáforo con texto)
- [ ] axe / Lighthouse sin errores críticos

**Responsive:** [ ] 1366 · [ ] 1024 · [ ] 768 · [ ] 390 px

**Tablas**
- [ ] Reporte real de Límites con el mismo orden, filtro y paginación
- [ ] Números es-EC, encabezado fijo, estado vacío
- [ ] Más de 1000 filas sin congelarse

**Formularios**
- [ ] Errores de Inertia visibles en cada campo
- [ ] Números de 13 enteros + 2 decimales
- [ ] Cancelar no guarda; doble clic no duplica

**Regresión**
- [ ] Rutas iguales; permisos por rol 1/2/4; 403 correcto
- [ ] Mismos datos y mismo Excel (mismo MD5)
- [ ] `/login?expirada=1` muestra el aviso
- [ ] Consola limpia; Pest en verde

**Comparación de los 3 mockups (pantalla Declaraciones)**
- [ ] Tamaño del bundle JS/CSS
- [ ] Formato es-EC y dd/mm/aaaa
- [ ] Compatible con Inertia 2 y Tailwind 3
- [ ] Convive con Bootstrap/AdminLTE sin romper estilos
- [ ] CSP sin `unsafe-inline`
