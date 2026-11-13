# Diseños RiskWeb — 3 demos de librerías de componentes

Prototipos **independientes** para elegir la librería de diseño de RiskWeb.
**Todos los datos son ficticios y están rotulados «Dato de ejemplo».**
Esto **no es el sistema de producción**: no se conecta a RiskWeb ni a ninguna base de datos o entorno real.

Fecha: 13/11/2026 (hora de Ecuador). Decisión vigente: **PrimeVue 4.5.5 fijo (MIT)**; PrimeVue 5 no es MIT.
Licencia: [MIT](LICENSE). Cómo reportar un problema: [SECURITY.md](SECURITY.md).

## Ver en línea (GitHub Pages, plan gratuito)

Portada: <https://jnarvaez-bit.github.io/Dise-os-de-risweb/>

| Demo | Librería | Enlace |
|---|---|---|
| `demo-primevue4/` | PrimeVue 4.5.5 + @primeuix/themes 2.0.3 (Aura, `cssLayer`) | <https://jnarvaez-bit.github.io/Dise-os-de-risweb/demo-primevue4/#/login?expirada=1> |
| `demo-shadcn-vue/` | shadcn-vue 1.0.3 + reka-ui 2.11.0 + @tanstack/vue-table 8.21.3 | <https://jnarvaez-bit.github.io/Dise-os-de-risweb/demo-shadcn-vue/#/login?expirada=1> |
| `demo-naiveui/` | Naive UI 2.45.3 | <https://jnarvaez-bit.github.io/Dise-os-de-risweb/demo-naiveui/#/login?expirada=1> |

Entre con cualquier usuario y la clave `demo`. Cada tabla o lista muestra **2 filas de ejemplo**. Nada se guarda: al recargar vuelven los datos de ejemplo.

Un repositorio público, GitHub Pages y GitHub Actions en repositorios públicos son gratuitos. Estas demos no usan secretos de Actions ni funciones de pago.

Las 3 usan Vite 6.4.6 + Vue 3.5.45 + TypeScript 5.8.3 + Tailwind 3.4.17 + vue-router 4.6.4 (hash), versiones fijas y `package-lock.json`. El pie de cada pantalla indica la librería y que los datos son ficticios.

Menú: **Tablero · Administración (Parámetros, Entidades) · Límites (Reportes, Declaraciones, Parametrización) · Tesorería (Cargar insumos)**.

| # | Pantalla | Ruta | Qué se puede hacer (todo simulado) |
|---|---|---|---|
| 1 | Login | `#/login?expirada=1` | Usuario + contraseña (mostrar/ocultar). Vacío → «Ingrese usuario y contraseña.»; clave distinta de `demo` → error; `demo` → Tablero. Aviso de sesión expirada. |
| 2 | Layout | todas | Menú lateral plegable, modo oscuro, **Cerrar sesión → login**. |
| 3 | Tablero | `#/tablero` | 2 KPI de ejemplo (Liquidez, Morosidad) + semáforo con texto. |
| 4 | Parámetros | `#/parametros` | Tarjeta **Límites colores L1/L2/L3** + «Editar colores» (valida `#RRGGBB`, «Restaurar valores de ejemplo»; al guardar cambia el semáforo en todo el demo). Tabla de 2 parámetros con «Editar». |
| 5 | Entidades | `#/entidades` | CRUD de 2 filas de ejemplo: buscar, «Exportar Excel» (CSV), «Nuevo»/«Editar» en modal con validación, «Eliminar» con confirmación. Si no hay filas: «No hay entidades que coincidan». |
| 6 | Reportes | `#/reportes` | Fecha de corte dd/mm/aaaa + tipo (LIM007, LIM008) + Generar con confirmación; tabla de 2 filas, paginación (botones inactivos si no hay más páginas), orden, números es-EC alineados a la derecha; «Exportar Excel» descarga CSV. |
| 7 | Declaraciones | `#/declaraciones` | 2 filas de ejemplo. «Nueva declaración» con confirmación; por fila Consultar, Imprimir (aviso) y Excel (CSV). |
| 8 | Parametrización | `#/parametrizacion` | 2 umbrales L1/L2/L3 de ejemplo: «Nueva definición»/«Editar» con validación (0–100; mayor es mejor L1 ≥ L2 ≥ L3, menor es mejor L1 ≤ L2 ≤ L3). |
| 9 | Cargar insumos | `#/cargar-insumos` | I01/I02 (.zip/.txt): nombre y tamaño, «Validar» simulado (no sube nada). |

«Excel» descarga un CSV de ejemplo (en un sistema real el Excel lo genera el backend).

## Cómo correr un demo en local

```bash
cd demo-primevue4      # o demo-shadcn-vue / demo-naiveui
npm ci
npm run dev            # http://localhost:5173/Dise-os-de-risweb/demo-primevue4/#/login?expirada=1
npm run build
npm run preview        # sirve dist/ en la misma ruta base
```

Requisitos: Node 20.19+ (probado con Node 24). La base de Vite es `/Dise-os-de-risweb/<carpeta-del-demo>/` para que coincida con GitHub Pages.

El build inyecta una política CSP (`default-src 'self'`; `style-src 'self' 'unsafe-inline'` porque Naive UI y algunos estilos de las otras librerías lo necesitan). No hay scripts, CDN ni analítica externos.

## Resultado del build (13/11/2026)

| Demo | `npm run build` | dist aproximado |
|---|---|---|
| PrimeVue 4 | ✅ sin errores TS | 1,8 MB (incluye 618 KB de primeicons) |
| shadcn-vue | ✅ sin errores TS | 624 KB |
| Naive UI | ✅ sin errores TS | 1,1 MB |

## Prueba automática de botones (Playwright)

```bash
cd scripts && npm ci
# en cada demo: npm run build   (la prueba usa dist/)
npm run test        # node test-botones.mjs [demo...]  -> docs/prueba-botones.md y .json
npm run rutas       # 8 rutas por demo, URL directa + F5, 0 errores de consola y 0 HTTP 404
npm run capturas    # node capturas.mjs                -> docs/capturas/*.png
npm run publicado   # las mismas rutas contra GitHub Pages
```

Usa `playwright-core` 1.65.0 con Google Chrome del sistema (`/usr/bin/google-chrome` o variable `CHROME_PATH`). **Falla** si un clic no tiene efecto visible o si hay errores en la consola.

Resultado local (13/11/2026, 13:24 hora de Ecuador) — detalle en `docs/prueba-botones.md`:

| Demo | Resultado | Rutas | Clics OK | Fallas | Deshabilitados* | Errores consola |
|---|---|---|---|---|---|---|
| PrimeVue 4 | ✅ PASA | 8 | 115 | 0 | 4 | 0 |
| shadcn-vue | ✅ PASA | 8 | 113 | 0 | 20 | 0 |
| Naive UI | ✅ PASA | 8 | 109 | 0 | 6 | 0 |

Las 8 rutas de cada demo también pasaron en vista previa local y en las URLs publicadas (URL directa + F5, HTTP 200, 0 errores de consola, 0 HTTP 404). La prueba de botones contra GitHub Pages, el 13/11/2026 a las 13:41 (hora de Ecuador), dio el mismo resultado: las 3 demos ✅ PASA, 0 fallas y 0 errores de consola.

\* Deshabilitados a propósito (por ejemplo «Página anterior» en la página 1, o paginación con solo 2 filas).

## Capturas

En `docs/capturas/` (1366×900), por demo: `_login`, `_tablero`, `_parametros`, `_parametros-colores`, `_entidades`, `_entidades-validacion`, `_reportes`, `_confirmacion`, `_declaraciones`, `_parametrizacion`, `_cargar-insumos`.

## Hallazgos

- **PrimeVue 4**: tabla, fechas, confirmación y carga salen listas; `cssLayer` convive con Tailwind 3 sin `!important`. Hay que cargar el locale en español a mano (`src/locale-es.ts`).
- **shadcn-vue 1.0.3**: el registro en línea ya entrega sintaxis de Tailwind 4 (`w-(--x)`); hubo que corregir 3 archivos a `w-[--x]`. También instaló `tailwind-merge@3` (es para Tailwind 4) y `lucide-vue-next@1.0.0` (deprecado); se fijaron `2.6.1` y `0.468.0`. La tabla hay que armarla.
- **Naive UI**: la tabla más completa sin código extra, pero estilos en tiempo de ejecución (CSP con `unsafe-inline`) y look propio.

## Publicación

La rama `demos-ui-2026-11-13` despliega el sitio con `.github/workflows/pages.yml` (Actions ancladas por SHA, sin secretos).
