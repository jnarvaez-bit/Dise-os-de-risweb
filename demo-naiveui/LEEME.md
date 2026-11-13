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
| Parámetros | `#/parametros` | NCard, NDataTable, NModal preset card, NInput, NTag, useMessage — tarjeta «Límites colores (L1/L2/L3)» + editor con validación #RRGGBB |
| Entidades | `#/entidades` | NDataTable, NInput (buscar), NModal (crear/editar con validación), NSelect, NSwitch, useDialog (eliminar), useMessage |
| Declaraciones | `#/declaraciones` | NDatePicker, NSelect, NDataTable, useDialog (nueva), NModal (consultar), useMessage (imprimir), descarga CSV (Excel) |
| Parametrización | `#/parametrizacion` | NDataTable, NModal, NInput, NInputNumber, NSelect, NAlert (regla L1/L2/L3) |

## Configuración
- `NConfigProvider` con `preflight-style-disabled`, locale `esAR` + `dateEsAR` (no existe es-EC), `darkTheme` con interruptor.
- `<meta name="naive-ui-style">` insertado por código antes de montar (para que Tailwind no pise sus estilos).

## Choques observados
- Sin choques visibles con Tailwind 3 tras la meta y `preflight-style-disabled`.
- **CSP:** Naive UI inyecta `<style>` en tiempo de ejecución; con CSP estricta haría falta `style-src 'unsafe-inline'` (no documenta nonce).
- Su look (menú, botones) no comparte las variables de Tailwind/shadcn del RiskWeb actual.
- «Excel» descarga un CSV de ejemplo (en RiskWeb lo hace el backend).

## Botones
Todos los botones hacen algo visible: abren modal, muestran aviso «Ejemplo: no se guardan datos», descargan un CSV de ejemplo o navegan. «Cerrar sesión» vuelve al login. Nada se guarda: al recargar vuelven los datos de ejemplo. Prueba automática: `../scripts/test-botones.mjs` (ver README raíz).
