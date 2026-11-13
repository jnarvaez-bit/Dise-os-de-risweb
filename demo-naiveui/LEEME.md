# Demo Naive UI 2.45.3 (solo para comparar — NO recomendada para Tailwind/CSP)

Datos ficticios. No toca RiskWeb.

```bash
npm ci        # o npm install
npm run dev   # http://localhost:5173/#/login?expirada=1  (clave de ejemplo: demo)
npm run build
```

## Componentes por pantalla
| Pantalla | Ruta | Componentes Naive UI |
|---|---|---|
| Layout | todas | NLayout, NLayoutSider, NMenu, NButton |
| Login | `#/login?expirada=1` | NInput (password, mostrar), NFormItem, NAlert, NButton |
| Tablero | `#/tablero` | NCard, NTag |
| Reportes | `#/reportes` | NDatePicker (dd/MM/yyyy), NSelect filterable, NDataTable (paginación, orden, columna fija, encabezado fijo), useDialog, useMessage |
| Cargar insumos | `#/cargar-insumos` | NUpload (`default-upload=false`, no sube), NCard, NAlert |

## Configuración
- `NConfigProvider` con `preflight-style-disabled`, locale `esAR` + `dateEsAR` (no existe es-EC), `darkTheme` con interruptor.
- `<meta name="naive-ui-style">` insertado por código antes de montar (para que Tailwind no pise sus estilos).

## Choques observados
- Sin choques visibles con Tailwind 3 tras la meta y `preflight-style-disabled`.
- **CSP:** Naive UI inyecta `<style>` en tiempo de ejecución; con CSP estricta haría falta `style-src 'unsafe-inline'` (no documenta nonce).
- Su look (menú, botones) no comparte las variables de Tailwind/shadcn del RiskWeb actual.
- Excel ficticio.
