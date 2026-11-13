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

`#/reportes?confirmar=1` abre el modal al cargar (solo para la captura).

## Configuración clave
- `@primeuix/themes@2.0.3` preset Aura, `darkModeSelector: '.dark'`, `cssLayer: { name: 'primevue', order: 'tailwind-base, primevue, tailwind-utilities' }` y las `@layer` de Tailwind 3 en `src/style.css`.
- Locale español completo en `src/locale-es.ts` (lunes primer día, `dd/mm/yy`).
- Plugin `tailwindcss-primeui` (versión JS para Tailwind 3).

## Qué faltó / notas
- El botón Excel es ficticio (en RiskWeb lo hace el backend).
- Se importa componente por componente; no se usó `unplugin-vue-components`.
- No se configuró nonce de CSP (en RiskWeb: `csp: { nonce }` + `Vite::useCspNonce()`).
