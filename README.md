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

Cada demo tiene las mismas pantallas (rutas con `#`):

1. **Layout**: sidebar plegable con menú de 2 niveles, header con empresa de ejemplo y modo oscuro.
2. **Filtro de reporte** (`#/reportes`): fecha de corte dd/mm/aaaa + tipo de reporte (LIM007…LIM013, LIF) + Generar.
3. **Tabla**: 120 filas, paginación 10/25/50, orden, encabezado fijo, números es-EC con 2 decimales, botón «Exportar Excel» ficticio.
4. **Confirmación** tipo `confirmarAccion` (Aceptar/Cancelar; `#/reportes?confirmar=1` la abre al cargar).
5. **Cargar insumos** I01/I02 (`#/cargar-insumos`): .zip/.txt, nombre y tamaño, «Validar» simulado (no sube nada).
6. **KPI** (`#/tablero`): Liquidez, Solvencia, Morosidad, Concentración.
7. **Semáforo** verde/amarillo/rojo/gris **siempre con texto** (Cumple/Alerta/Incumple/Sin dato).
8. **Login** (`#/login?expirada=1`): usuario, contraseña con mostrar/ocultar, error de ejemplo y aviso de sesión expirada. Clave de ejemplo: `demo`.

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

| Demo | Build | dist total | JS (gzip) | CSS | Fuentes |
|---|---|---|---|---|---|
| PrimeVue 4 | ✅ sin errores TS | 1,7 MB | 1016 KB (240 KB) | 22 KB | 618 KB (primeicons) |
| shadcn-vue | ✅ sin errores TS | 528 KB | 439 KB (140 KB) | 55 KB | — |
| Naive UI | ✅ sin errores TS | 1,0 MB | 970 KB (282 KB) | 8 KB (+ CSS-in-JS) | — |

`npm audit --omit=dev`: 0 vulnerabilidades en los 3. Consola del navegador limpia en las 5 capturas de cada demo.

## Capturas

En `docs/capturas/` (1366×900): `<demo>_login.png`, `_tablero.png`, `_reportes.png`, `_confirmacion.png`, `_cargar-insumos.png`.
Para regenerarlas: `(cd scripts && npm i --no-save puppeteer-core@24)` y luego `scripts/capturar.sh demo-primevue4 4301` (requiere Google Chrome y el `dist/` construido).

## Hallazgos

- **PrimeVue 4**: tabla, fechas, confirmación y carga salen listas; `cssLayer` convive con Tailwind 3 sin `!important`. Hay que cargar el locale en español a mano (`src/locale-es.ts`).
- **shadcn-vue 1.0.3**: el registro en línea ya entrega sintaxis de Tailwind 4 (`w-(--x)`); hubo que corregir 3 archivos a `w-[--x]`. También instaló `tailwind-merge@3` (es para Tailwind 4) y `lucide-vue-next@1.0.0` (deprecado); se fijaron `2.6.1` y `0.468.0`. La tabla hay que armarla.
- **Naive UI**: la tabla más completa sin código extra, pero estilos en tiempo de ejecución (CSP con `unsafe-inline`) y look propio.

## Reglas

- PROHIBIDO git push salvo que Jhon lo haga/autorice. Repo creado solo localmente.
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
