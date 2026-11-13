# Demo PrimeVue 4 (4.5.5, MIT)

Datos ficticios. No toca RiskWeb.

```bash
npm ci        # o npm install
npm run dev   # http://localhost:5173/#/login?expirada=1  (clave de ejemplo: demo)
npm run build
```

## Componentes por pantalla
| Pantalla | Ruta | Componentes PrimeVue |
|---|---|---|
| Layout | todas | PanelMenu, Button (plegar, modo oscuro, salir) |
| Login | `#/login?expirada=1` | InputText, Password (toggleMask), Button, Message |
| Tablero (KPI + semáforo) | `#/tablero` | Card, Tag |
| Reportes (filtro + tabla + confirmación + Excel) | `#/reportes` | DatePicker (dd/mm/aaaa), Select filter, DataTable + Column (paginator, sortable, scrollable, frozen), ConfirmDialog, Toast |
| Cargar insumos I01/I02 | `#/cargar-insumos` | FileUpload mode="basic" (sin subir), Card, Message, Toast |
| Parámetros | `#/parametros` | Card, DataTable, Dialog, InputText, Tag, Toast — tarjeta «Límites colores (L1/L2/L3)» + editor con validación #RRGGBB |
| Entidades | `#/entidades` | DataTable (paginación, orden), InputText (buscar), Dialog (crear/editar con validación), ToggleSwitch, ConfirmDialog (eliminar), Toast |
| Declaraciones | `#/declaraciones` | DatePicker, Select, DataTable, ConfirmDialog (nueva), Dialog (consultar), Toast (imprimir), descarga CSV (Excel) |
| Parametrización | `#/parametrizacion` | DataTable, Dialog, InputText, InputNumber (es-EC), Select, Message (regla L1/L2/L3) |

`#/reportes?confirmar=1` abre el modal al cargar (solo para la captura).

## Configuración clave
- `@primeuix/themes@2.0.3` preset Aura, `darkModeSelector: '.dark'`, `cssLayer: { name: 'primevue', order: 'tailwind-base, primevue, tailwind-utilities' }` y las `@layer` de Tailwind 3 en `src/style.css`.
- Locale español completo en `src/locale-es.ts` (lunes primer día, `dd/mm/yy`).
- Plugin `tailwindcss-primeui` (versión JS para Tailwind 3).

## Qué faltó / notas
- «Excel» descarga un CSV de ejemplo (en RiskWeb el Excel real lo hace el backend).
- Se importa componente por componente; no se usó `unplugin-vue-components`.
- No se configuró nonce de CSP (en RiskWeb: `csp: { nonce }` + `Vite::useCspNonce()`).

## Botones
Todos los botones hacen algo visible: abren modal, muestran aviso «Ejemplo: no se guardan datos», descargan un CSV de ejemplo o navegan. «Cerrar sesión» vuelve al login. Nada se guarda: al recargar vuelven los datos de ejemplo. Prueba automática: `../scripts/test-botones.mjs` (ver README raíz).
