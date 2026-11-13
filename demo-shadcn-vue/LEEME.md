# Demo shadcn-vue 1.0.3 (Tailwind 3 + reka-ui 2)

Datos ficticios. No toca RiskWeb.

```bash
npm ci        # o npm install
npm run dev   # http://localhost:5173/#/login?expirada=1  (clave de ejemplo: demo)
npm run build
```

Componentes generados con `npx shadcn-vue@1.0.3 init -d` y `add` (sidebar, button, input, label, select, popover, calendar, table, alert-dialog, card, badge, sonner, dropdown-menu, alert). Estilo `default`, base `zinc`.

## Componentes por pantalla
| Pantalla | Ruta | Componentes |
|---|---|---|
| Layout | todas | Sidebar (SidebarProvider, SidebarTrigger, SidebarMenu…) |
| Login | `#/login?expirada=1` | Input, Label, Button, Alert |
| Tablero | `#/tablero` | Card, Badge (`RwSemaforo`) |
| Reportes | `#/reportes` | `RwDatePicker` (Popover + Calendar), Select, `RwDataTable` (TanStack Table 8.21.3 + Table), `RwConfirmar` (AlertDialog), Sonner |
| Cargar insumos | `#/cargar-insumos` | Input type=file, Card, Alert, Sonner |

Wrappers propios en `src/components/rw/`.

## ⚠️ Hallazgo importante
El CLI `shadcn-vue@1.0.3` descarga los componentes del registro en línea, y este **ya entrega sintaxis de Tailwind 4** (`w-(--sidebar-width)`, `h-(--reka-select-trigger-height)`). Con Tailwind 3 el sidebar se encimaba sobre el contenido. Se corrigió a `w-[--sidebar-width]` en `sidebar/Sidebar.vue`, `sidebar/SidebarMenuSkeleton.vue` y `select/SelectContent.vue` (comentario al inicio). **En RiskWeb: revisar cada componente nuevo antes de usarlo.**
Además el CLI instaló `lucide-vue-next@1.0.0` (deprecado) y `tailwind-merge@3` (es para Tailwind 4): se fijaron `lucide-vue-next@0.468.0` y `tailwind-merge@2.6.1`.

## Qué faltó
- Select sin búsqueda (para eso: Combobox/Command, no incluido).
- La tabla (paginación, orden, encabezado fijo) hubo que armarla a mano.
- Excel ficticio.
