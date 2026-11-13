# Resultado de la prueba de botones

Fecha: 13/11/2026, 1:24:30 p. m. (hora de Ecuador). Script: `scripts/test-botones.mjs`.

| Demo | Resultado | Rutas | Clics OK | Fallas | Deshabilitados | Errores consola | Avisos consola |
|---|---|---|---|---|---|---|---|
| demo-primevue4 | ✅ PASA | 8 | 115 | 0 | 4 | 0 | 0 |
| demo-shadcn-vue | ✅ PASA | 8 | 113 | 0 | 20 | 0 | 0 |
| demo-naiveui | ✅ PASA | 8 | 109 | 0 | 6 | 0 | 0 |

Criterio: un clic es OK si cambia el DOM fuera del propio botón, cambia la URL, inicia una descarga o abre un modal. Los elementos del menú lateral/encabezado se prueban una vez; las acciones por fila, en 2 filas por pantalla.

## demo-primevue4

| Ruta | Nivel | Elemento | Estado | Efecto |
|---|---|---|---|---|
| /login | pantalla | Ingresar | OK | dom(13) |
| /tablero | pantalla | Tablero | OK | dom(13) |
| /tablero | pantalla | Administración | OK | dom(16) |
| /tablero | pantalla | Parámetros | OK | dom(133), navega /parametros |
| /tablero | pantalla | Entidades | OK | dom(216), navega /entidades |
| /tablero | pantalla | Límites | OK | dom(16) |
| /tablero | pantalla | Reportes | OK | dom(219), navega /reportes |
| /tablero | pantalla | Declaraciones | OK | dom(257), navega /declaraciones |
| /tablero | pantalla | Parametrización | OK | dom(152), navega /parametrizacion |
| /tablero | pantalla | Tesorería | OK | dom(16) |
| /tablero | pantalla | Cargar insumos | OK | dom(49), navega /cargar-insumos |
| /tablero | pantalla | Plegar menú | OK | dom(1) |
| /tablero | pantalla | Modo oscuro | OK | dom(2) |
| /tablero | pantalla | Cerrar sesión | OK | dom(34), navega /login |
| /parametros | pantalla | Editar colores | OK | dom(39), abre modal |
| /parametros | modal de «Editar colores» | Cerrar | OK | dom(14) |
| /parametros | modal de «Editar colores» | Restaurar valores de ejemplo | OK | dom(15) |
| /parametros | modal de «Editar colores» | Cancelar | OK | dom(14) |
| /parametros | modal de «Editar colores» | Guardar | OK | dom(28) |
| /parametros | pantalla | Editar param_limites | OK | dom(35), abre modal |
| /parametros | modal de «Editar param_limites» | Cerrar | OK | dom(14) |
| /parametros | modal de «Editar param_limites» | Cancelar | OK | dom(14) |
| /parametros | modal de «Editar param_limites» | Guardar | OK | dom(28) |
| /parametros | pantalla | Editar limites_colores | OK | dom(40), abre modal |
| /parametros | modal de «Editar limites_colores» | Cerrar | OK | dom(14) |
| /parametros | modal de «Editar limites_colores» | Restaurar valores de ejemplo | OK | dom(15) |
| /parametros | modal de «Editar limites_colores» | Cancelar | OK | dom(14) |
| /parametros | modal de «Editar limites_colores» | Guardar | OK | dom(28) |
| /entidades | pantalla | Exportar Excel | OK | dom(15), descarga |
| /entidades | pantalla | Nuevo | OK | dom(48), abre modal |
| /entidades | modal de «Nuevo» | Cerrar | OK | dom(19) |
| /entidades | modal de «Nuevo» | Seleccione | OK | dom(28) |
| /entidades | modal de «Nuevo» | p-toggleswitch-input | OK | dom(7), cambia su estado |
| /entidades | modal de «Nuevo» | Cancelar | OK | dom(19) |
| /entidades | modal de «Nuevo» | Guardar | OK | dom(22) |
| /entidades | pantalla | Código | OK | dom(14) |
| /entidades | pantalla | Nombre | OK | dom(14) |
| /entidades | pantalla | Tipo | OK | dom(14) |
| /entidades | pantalla | Editar Banco Ejemplo Uno S.A. | OK | dom(49), abre modal |
| /entidades | modal de «Editar Banco Ejemplo Uno S.A.» | Cerrar | OK | dom(19) |
| /entidades | modal de «Editar Banco Ejemplo Uno S.A.» | Banco | OK | dom(28) |
| /entidades | modal de «Editar Banco Ejemplo Uno S.A.» | p-toggleswitch-input | OK | dom(7), cambia su estado |
| /entidades | modal de «Editar Banco Ejemplo Uno S.A.» | Cancelar | OK | dom(19) |
| /entidades | modal de «Editar Banco Ejemplo Uno S.A.» | Guardar | OK | dom(41) |
| /entidades | pantalla | Eliminar Banco Ejemplo Uno S.A. | OK | dom(25), abre modal |
| /entidades | modal de «Eliminar Banco Ejemplo Uno S.A.» | Cerrar | OK | dom(14) |
| /entidades | modal de «Eliminar Banco Ejemplo Uno S.A.» | Cancelar | OK | dom(14) |
| /entidades | modal de «Eliminar Banco Ejemplo Uno S.A.» | Eliminar | OK | dom(45) |
| /entidades | pantalla | Editar Cooperativa Ejemplo Alfa Ltda. | OK | dom(49), abre modal |
| /entidades | modal de «Editar Cooperativa Ejemplo Alfa Ltda.» | Cerrar | OK | dom(19) |
| /entidades | modal de «Editar Cooperativa Ejemplo Alfa Ltda.» | Cooperativa | OK | dom(28) |
| /entidades | modal de «Editar Cooperativa Ejemplo Alfa Ltda.» | p-toggleswitch-input | OK | dom(7), cambia su estado |
| /entidades | modal de «Editar Cooperativa Ejemplo Alfa Ltda.» | Cancelar | OK | dom(19) |
| /entidades | modal de «Editar Cooperativa Ejemplo Alfa Ltda.» | Guardar | OK | dom(41) |
| /entidades | pantalla | Eliminar Cooperativa Ejemplo Alfa Ltda. | OK | dom(25), abre modal |
| /entidades | modal de «Eliminar Cooperativa Ejemplo Alfa Ltda.» | Cerrar | OK | dom(14) |
| /entidades | modal de «Eliminar Cooperativa Ejemplo Alfa Ltda.» | Cancelar | OK | dom(14) |
| /entidades | modal de «Eliminar Cooperativa Ejemplo Alfa Ltda.» | Eliminar | OK | dom(39) |
| /entidades | pantalla | Primera página | deshabilitado |  |
| /entidades | pantalla | Página anterior | deshabilitado |  |
| /entidades | pantalla | Página 1 | actual | página/opción ya seleccionada |
| /entidades | pantalla | Página siguiente | deshabilitado |  |
| /entidades | pantalla | Última página | deshabilitado |  |
| /entidades | pantalla | Filas por página | OK | dom(24) |
| /reportes | pantalla | p-inputtext p-component p-filled p-inputtext-fluid p-datepicker-input | OK | dom(98) |
| /reportes | pantalla | Elegir fecha | OK | dom(100) |
| /reportes | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(37) |
| /reportes | pantalla | Generar | OK | dom(24), abre modal |
| /reportes | modal de «Generar» | Cerrar | OK | dom(14) |
| /reportes | modal de «Generar» | Cancelar | OK | dom(14) |
| /reportes | modal de «Generar» | Aceptar | OK | dom(54) |
| /reportes | pantalla | Exportar Excel | OK | dom(15), descarga |
| /reportes | pantalla | Código | OK | dom(15) |
| /reportes | pantalla | Indicador | OK | dom(15) |
| /reportes | pantalla | Valor | OK | dom(31) |
| /reportes | pantalla | Límite | OK | dom(31) |
| /reportes | pantalla | Estado | OK | dom(15) |
| /declaraciones | pantalla | p-inputtext p-component p-filled p-inputtext-fluid p-datepicker-input | OK | dom(98) |
| /declaraciones | pantalla | Elegir fecha | OK | dom(100) |
| /declaraciones | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(37) |
| /declaraciones | pantalla | Nueva declaración | OK | dom(24), abre modal |
| /declaraciones | modal de «Nueva declaración» | Cerrar | OK | dom(14) |
| /declaraciones | modal de «Nueva declaración» | Cancelar | OK | dom(14) |
| /declaraciones | modal de «Nueva declaración» | Aceptar | OK | dom(76) |
| /declaraciones | pantalla | Corte | OK | dom(40) |
| /declaraciones | pantalla | Tipo | OK | dom(12) |
| /declaraciones | pantalla | Consultar LIM007 | OK | dom(100), abre modal |
| /declaraciones | modal de «Consultar LIM007» | Cerrar | OK | dom(14) |
| /declaraciones | modal de «Consultar LIM007» | Imprimir | OK | dom(13) |
| /declaraciones | modal de «Consultar LIM007» | Excel | OK | dom(15), descarga |
| /declaraciones | modal de «Consultar LIM007» | Cerrar | OK | dom(14) |
| /declaraciones | pantalla | Imprimir LIM007 | OK | dom(14) |
| /declaraciones | pantalla | Excel LIM007 | OK | dom(16), descarga |
| /declaraciones | pantalla | Consultar LIM008 | OK | dom(100), abre modal |
| /declaraciones | modal de «Consultar LIM008» | Cerrar | OK | dom(14) |
| /declaraciones | modal de «Consultar LIM008» | Imprimir | OK | dom(13) |
| /declaraciones | modal de «Consultar LIM008» | Excel | OK | dom(15), descarga |
| /declaraciones | modal de «Consultar LIM008» | Cerrar | OK | dom(14) |
| /declaraciones | pantalla | Imprimir LIM008 | OK | dom(14) |
| /declaraciones | pantalla | Excel LIM008 | OK | dom(16), descarga |
| /parametrizacion | pantalla | Nueva definición | OK | dom(64), abre modal |
| /parametrizacion | modal de «Nueva definición» | Cerrar | OK | dom(19) |
| /parametrizacion | modal de «Nueva definición» | Mayor es mejor | OK | dom(24) |
| /parametrizacion | modal de «Nueva definición» | Cancelar | OK | dom(19) |
| /parametrizacion | modal de «Nueva definición» | Guardar | OK | dom(33) |
| /parametrizacion | pantalla | Código | OK | dom(8) |
| /parametrizacion | pantalla | Editar LIQ_PRIMERA_LINEA | OK | dom(65), abre modal |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Cerrar | OK | dom(19) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Mayor es mejor | OK | dom(24) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Cancelar | OK | dom(19) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Guardar | OK | dom(33) |
| /parametrizacion | pantalla | Editar MOROSIDAD_TOTAL | OK | dom(65), abre modal |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Cerrar | OK | dom(19) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Mayor es mejor | OK | dom(24) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Cancelar | OK | dom(19) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Guardar | OK | dom(33) |
| /cargar-insumos | pantalla | Elegir archivo | OK | selector de archivo |
| /cargar-insumos | pantalla | Validar | OK | dom(13) |
| /cargar-insumos | pantalla | Elegir archivo | OK | selector de archivo |
| /cargar-insumos | pantalla | Validar | OK | dom(13) |

## demo-shadcn-vue

| Ruta | Nivel | Elemento | Estado | Efecto |
|---|---|---|---|---|
| /login | pantalla | Mostrar contraseña | OK | dom(1) |
| /login | pantalla | Ingresar | OK | dom(2) |
| /tablero | pantalla | Tablero | actual | página/opción ya seleccionada |
| /tablero | pantalla | Parámetros | OK | dom(33), navega /parametros |
| /tablero | pantalla | Entidades | OK | dom(37), navega /entidades |
| /tablero | pantalla | Reportes | OK | dom(47), navega /reportes |
| /tablero | pantalla | Declaraciones | OK | dom(61), navega /declaraciones |
| /tablero | pantalla | Parametrización | OK | dom(26), navega /parametrizacion |
| /tablero | pantalla | Cargar insumos | OK | dom(10), navega /cargar-insumos |
| /tablero | pantalla | Plegar menú | OK | dom(2) |
| /tablero | pantalla | Modo oscuro | OK | dom(1) |
| /tablero | pantalla | Cerrar sesión | OK | dom(9), navega /login |
| /parametros | pantalla | Editar colores | OK | dom(11), abre modal |
| /parametros | modal de «Editar colores» | Restaurar valores de ejemplo | OK | dom(6) |
| /parametros | modal de «Editar colores» | Cancelar | OK | dom(13) |
| /parametros | modal de «Editar colores» | Guardar | OK | dom(27) |
| /parametros | modal de «Editar colores» | Close | OK | dom(13) |
| /parametros | pantalla | Ordenar por Clave | OK | dom(10) |
| /parametros | pantalla | Ordenar por Descripción | OK | dom(10) |
| /parametros | pantalla | Ordenar por Tipo | OK | dom(10) |
| /parametros | pantalla | Editar param_limites | OK | dom(11), abre modal |
| /parametros | modal de «Editar param_limites» | Cancelar | OK | dom(13) |
| /parametros | modal de «Editar param_limites» | Guardar | OK | dom(27) |
| /parametros | modal de «Editar param_limites» | Close | OK | dom(13) |
| /parametros | pantalla | Editar limites_colores | OK | dom(11), abre modal |
| /parametros | modal de «Editar limites_colores» | Restaurar valores de ejemplo | OK | dom(6) |
| /parametros | modal de «Editar limites_colores» | Cancelar | OK | dom(13) |
| /parametros | modal de «Editar limites_colores» | Guardar | OK | dom(27) |
| /parametros | modal de «Editar limites_colores» | Close | OK | dom(13) |
| /parametros | pantalla | Primera página | deshabilitado |  |
| /parametros | pantalla | Página anterior | deshabilitado |  |
| /parametros | pantalla | Página siguiente | deshabilitado |  |
| /parametros | pantalla | Última página | deshabilitado |  |
| /entidades | pantalla | Exportar Excel | OK | dom(8), descarga |
| /entidades | pantalla | Nuevo | OK | dom(25), abre modal |
| /entidades | modal de «Nuevo» | Seleccione | OK | dom(21) |
| /entidades | modal de «Nuevo» | Activo | OK | cambia su estado |
| /entidades | modal de «Nuevo» | Cancelar | OK | dom(20) |
| /entidades | modal de «Nuevo» | Guardar | OK | dom(12) |
| /entidades | modal de «Nuevo» | Close | OK | dom(20) |
| /entidades | pantalla | Ordenar por Código | OK | dom(8) |
| /entidades | pantalla | Ordenar por Nombre | OK | dom(8) |
| /entidades | pantalla | Ordenar por Tipo | OK | dom(8) |
| /entidades | pantalla | Ordenar por Estado | OK | dom(8) |
| /entidades | pantalla | Editar BEJ01 | OK | dom(27), abre modal |
| /entidades | modal de «Editar BEJ01» | Banco | OK | dom(21) |
| /entidades | modal de «Editar BEJ01» | Activo | OK | cambia su estado |
| /entidades | modal de «Editar BEJ01» | Cancelar | OK | dom(20) |
| /entidades | modal de «Editar BEJ01» | Guardar | OK | dom(34) |
| /entidades | modal de «Editar BEJ01» | Close | OK | dom(20) |
| /entidades | pantalla | Eliminar BEJ01 | OK | dom(11), abre modal |
| /entidades | modal de «Eliminar BEJ01» | Cancelar | OK | dom(13) |
| /entidades | modal de «Eliminar BEJ01» | Aceptar | OK | dom(35) |
| /entidades | pantalla | Editar CEJ01 | OK | dom(27), abre modal |
| /entidades | modal de «Editar CEJ01» | Cooperativa | OK | dom(21) |
| /entidades | modal de «Editar CEJ01» | Activo | OK | cambia su estado |
| /entidades | modal de «Editar CEJ01» | Cancelar | OK | dom(20) |
| /entidades | modal de «Editar CEJ01» | Guardar | OK | dom(34) |
| /entidades | modal de «Editar CEJ01» | Close | OK | dom(20) |
| /entidades | pantalla | Eliminar CEJ01 | OK | dom(11), abre modal |
| /entidades | modal de «Eliminar CEJ01» | Cancelar | OK | dom(13) |
| /entidades | modal de «Eliminar CEJ01» | Aceptar | OK | dom(29) |
| /entidades | pantalla | Primera página | deshabilitado |  |
| /entidades | pantalla | Página anterior | deshabilitado |  |
| /entidades | pantalla | Página siguiente | deshabilitado |  |
| /entidades | pantalla | Última página | deshabilitado |  |
| /reportes | pantalla | 31/10/2026 | OK | dom(12) |
| /reportes | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(22) |
| /reportes | pantalla | Generar | OK | dom(13), abre modal |
| /reportes | modal de «Generar» | Cancelar | OK | dom(15) |
| /reportes | modal de «Generar» | Aceptar | OK | dom(33) |
| /reportes | pantalla | Exportar Excel | OK | dom(8), descarga |
| /reportes | pantalla | Ordenar por Código | OK | dom(8) |
| /reportes | pantalla | Ordenar por Indicador | OK | dom(8) |
| /reportes | pantalla | Ordenar por Valor | OK | dom(8) |
| /reportes | pantalla | Ordenar por Límite | OK | dom(8) |
| /reportes | pantalla | Ordenar por Estado | OK | dom(8) |
| /reportes | pantalla | Primera página | deshabilitado |  |
| /reportes | pantalla | Página anterior | deshabilitado |  |
| /reportes | pantalla | Página siguiente | deshabilitado |  |
| /reportes | pantalla | Última página | deshabilitado |  |
| /declaraciones | pantalla | 31/10/2026 | OK | dom(12) |
| /declaraciones | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(22) |
| /declaraciones | pantalla | Nueva declaración | OK | dom(13), abre modal |
| /declaraciones | modal de «Nueva declaración» | Cancelar | OK | dom(15) |
| /declaraciones | modal de «Nueva declaración» | Aceptar | OK | dom(38) |
| /declaraciones | pantalla | Ordenar por Corte | OK | dom(8) |
| /declaraciones | pantalla | Ordenar por Tipo | OK | dom(8) |
| /declaraciones | pantalla | Ordenar por Estado | OK | dom(10) |
| /declaraciones | pantalla | Consultar LIM007 | OK | dom(13), abre modal |
| /declaraciones | modal de «Consultar LIM007» | Imprimir | OK | dom(6) |
| /declaraciones | modal de «Consultar LIM007» | Excel | OK | dom(8), descarga |
| /declaraciones | modal de «Consultar LIM007» | Cerrar | OK | dom(15) |
| /declaraciones | modal de «Consultar LIM007» | Close | OK | dom(15) |
| /declaraciones | pantalla | Imprimir LIM007 | OK | dom(6) |
| /declaraciones | pantalla | Excel LIM007 | OK | dom(8), descarga |
| /declaraciones | pantalla | Consultar LIM008 | OK | dom(13), abre modal |
| /declaraciones | modal de «Consultar LIM008» | Imprimir | OK | dom(6) |
| /declaraciones | modal de «Consultar LIM008» | Excel | OK | dom(8), descarga |
| /declaraciones | modal de «Consultar LIM008» | Cerrar | OK | dom(15) |
| /declaraciones | modal de «Consultar LIM008» | Close | OK | dom(15) |
| /declaraciones | pantalla | Imprimir LIM008 | OK | dom(6) |
| /declaraciones | pantalla | Excel LIM008 | OK | dom(8), descarga |
| /declaraciones | pantalla | Primera página | deshabilitado |  |
| /declaraciones | pantalla | Página anterior | deshabilitado |  |
| /declaraciones | pantalla | Página siguiente | deshabilitado |  |
| /declaraciones | pantalla | Última página | deshabilitado |  |
| /parametrizacion | pantalla | Nueva definición | OK | dom(25), abre modal |
| /parametrizacion | modal de «Nueva definición» | Mayor es mejor | OK | dom(21) |
| /parametrizacion | modal de «Nueva definición» | Cancelar | OK | dom(20) |
| /parametrizacion | modal de «Nueva definición» | Guardar | OK | dom(15) |
| /parametrizacion | modal de «Nueva definición» | Close | OK | dom(20) |
| /parametrizacion | pantalla | Ordenar por Código | OK | dom(8) |
| /parametrizacion | pantalla | Ordenar por Nombre | OK | dom(8) |
| /parametrizacion | pantalla | Ordenar por Sentido | OK | dom(8) |
| /parametrizacion | pantalla | Ordenar por L1 | OK | dom(8) |
| /parametrizacion | pantalla | Ordenar por L2 | OK | dom(8) |
| /parametrizacion | pantalla | Ordenar por L3 | OK | dom(8) |
| /parametrizacion | pantalla | Editar LIQ_PRIMERA_LINEA | OK | dom(25), abre modal |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Mayor es mejor | OK | dom(21) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Cancelar | OK | dom(20) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Guardar | OK | dom(34) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Close | OK | dom(20) |
| /parametrizacion | pantalla | Editar MOROSIDAD_TOTAL | OK | dom(25), abre modal |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Mayor es mejor | OK | dom(21) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Cancelar | OK | dom(20) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Guardar | OK | dom(34) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Close | OK | dom(20) |
| /parametrizacion | pantalla | Primera página | deshabilitado |  |
| /parametrizacion | pantalla | Página anterior | deshabilitado |  |
| /parametrizacion | pantalla | Página siguiente | deshabilitado |  |
| /parametrizacion | pantalla | Última página | deshabilitado |  |
| /cargar-insumos | pantalla | Validar | OK | dom(6) |
| /cargar-insumos | pantalla | Validar | OK | dom(6) |

## demo-naiveui

| Ruta | Nivel | Elemento | Estado | Efecto |
|---|---|---|---|---|
| /login | pantalla | Ingresar | OK | dom(3) |
| /tablero | pantalla | Tablero | actual | página/opción ya seleccionada |
| /tablero | pantalla | Administración | OK | dom(13) |
| /tablero | pantalla | Parámetros | OK | dom(16), navega /parametros |
| /tablero | pantalla | Entidades | OK | dom(25), navega /entidades |
| /tablero | pantalla | Límites | OK | dom(13) |
| /tablero | pantalla | Reportes | OK | dom(28), navega /reportes |
| /tablero | pantalla | Declaraciones | OK | dom(32), navega /declaraciones |
| /tablero | pantalla | Parametrización | OK | dom(18), navega /parametrizacion |
| /tablero | pantalla | Tesorería | OK | dom(12) |
| /tablero | pantalla | Plegar menú | OK | dom(35) |
| /tablero | pantalla | Modo oscuro | OK | dom(189) |
| /tablero | pantalla | Cerrar sesión | OK | dom(8), navega /login |
| /parametros | pantalla | Editar colores | OK | dom(25), abre modal |
| /parametros | modal de «Editar colores» | close | OK | dom(27) |
| /parametros | modal de «Editar colores» | Restaurar valores de ejemplo | OK | dom(22) |
| /parametros | modal de «Editar colores» | Cancelar | OK | dom(28) |
| /parametros | modal de «Editar colores» | Guardar | OK | dom(44) |
| /parametros | pantalla | Editar param_limites | OK | dom(25), abre modal |
| /parametros | modal de «Editar param_limites» | close | OK | dom(25) |
| /parametros | modal de «Editar param_limites» | Cancelar | OK | dom(26) |
| /parametros | modal de «Editar param_limites» | Guardar | OK | dom(42) |
| /parametros | pantalla | Editar limites_colores | OK | dom(25), abre modal |
| /parametros | modal de «Editar limites_colores» | close | OK | dom(27) |
| /parametros | modal de «Editar limites_colores» | Restaurar valores de ejemplo | OK | dom(22) |
| /parametros | modal de «Editar limites_colores» | Cancelar | OK | dom(28) |
| /parametros | modal de «Editar limites_colores» | Guardar | OK | dom(44) |
| /entidades | pantalla | Exportar Excel | OK | dom(18), descarga |
| /entidades | pantalla | Nuevo | OK | dom(28), abre modal |
| /entidades | modal de «Nuevo» | close | OK | dom(27) |
| /entidades | modal de «Nuevo» | loading | OK | dom(45) |
| /entidades | modal de «Nuevo» | n-switch n-switch--active n-switch--round n-switch--rubber-band | OK | dom(3), cambia su estado |
| /entidades | modal de «Nuevo» | Cancelar | OK | dom(28) |
| /entidades | modal de «Nuevo» | Guardar | OK | dom(38) |
| /entidades | pantalla | Código | OK | dom(16) |
| /entidades | pantalla | Nombre | OK | dom(16) |
| /entidades | pantalla | Tipo | OK | dom(16) |
| /entidades | pantalla | Editar BEJ01 | OK | dom(28), abre modal |
| /entidades | modal de «Editar BEJ01» | close | OK | dom(27) |
| /entidades | modal de «Editar BEJ01» | Banco | OK | dom(45) |
| /entidades | modal de «Editar BEJ01» | n-switch n-switch--active n-switch--round n-switch--rubber-band | OK | dom(3), cambia su estado |
| /entidades | modal de «Editar BEJ01» | Cancelar | OK | dom(28) |
| /entidades | modal de «Editar BEJ01» | Guardar | OK | dom(45) |
| /entidades | pantalla | Eliminar BEJ01 | OK | dom(21), abre modal |
| /entidades | modal de «Eliminar BEJ01» | close | OK | dom(26) |
| /entidades | modal de «Eliminar BEJ01» | Cancelar | OK | dom(26) |
| /entidades | modal de «Eliminar BEJ01» | Aceptar | OK | dom(44) |
| /entidades | pantalla | Editar CEJ01 | OK | dom(28), abre modal |
| /entidades | modal de «Editar CEJ01» | close | OK | dom(27) |
| /entidades | modal de «Editar CEJ01» | Cooperativa | OK | dom(45) |
| /entidades | modal de «Editar CEJ01» | n-switch n-switch--active n-switch--round n-switch--rubber-band | OK | dom(3), cambia su estado |
| /entidades | modal de «Editar CEJ01» | Cancelar | OK | dom(28) |
| /entidades | modal de «Editar CEJ01» | Guardar | OK | dom(45) |
| /entidades | pantalla | Eliminar CEJ01 | OK | dom(21), abre modal |
| /entidades | modal de «Eliminar CEJ01» | close | OK | dom(26) |
| /entidades | modal de «Eliminar CEJ01» | Cancelar | OK | dom(26) |
| /entidades | modal de «Eliminar CEJ01» | Aceptar | OK | dom(49) |
| /entidades | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /entidades | pantalla | 1 | actual | página/opción ya seleccionada |
| /entidades | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /reportes | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(36) |
| /reportes | pantalla | ▶ Generar | OK | dom(22), abre modal |
| /reportes | modal de «▶ Generar» | close | OK | dom(26) |
| /reportes | modal de «▶ Generar» | Cancelar | OK | dom(26) |
| /reportes | modal de «▶ Generar» | Aceptar | OK | dom(68) |
| /reportes | pantalla | Exportar Excel | OK | dom(18), descarga |
| /reportes | pantalla | Código | OK | dom(16) |
| /reportes | pantalla | Indicador | OK | dom(16) |
| /reportes | pantalla | Valor | OK | dom(2) |
| /reportes | pantalla | Límite | OK | dom(2) |
| /reportes | pantalla | Estado | OK | dom(2) |
| /reportes | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /reportes | pantalla | 1 | actual | página/opción ya seleccionada |
| /reportes | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /reportes | pantalla | 10 / página | OK | dom(28) |
| /declaraciones | pantalla | LIM007 · Liquidez estructural (ejemplo) | OK | dom(36) |
| /declaraciones | pantalla | Nueva declaración | OK | dom(21), abre modal |
| /declaraciones | modal de «Nueva declaración» | close | OK | dom(26) |
| /declaraciones | modal de «Nueva declaración» | Cancelar | OK | dom(26) |
| /declaraciones | modal de «Nueva declaración» | Aceptar | OK | dom(45) |
| /declaraciones | pantalla | Corte | OK | dom(2) |
| /declaraciones | pantalla | Tipo | OK | dom(14) |
| /declaraciones | pantalla | Consultar LIM007 | OK | dom(24), abre modal |
| /declaraciones | modal de «Consultar LIM007» | close | OK | dom(23) |
| /declaraciones | modal de «Consultar LIM007» | Imprimir | OK | dom(17) |
| /declaraciones | modal de «Consultar LIM007» | Excel | OK | dom(19), descarga |
| /declaraciones | modal de «Consultar LIM007» | Cerrar | OK | dom(23) |
| /declaraciones | pantalla | Imprimir LIM007 | OK | dom(16) |
| /declaraciones | pantalla | Excel LIM007 | OK | dom(18), descarga |
| /declaraciones | pantalla | Consultar LIM008 | OK | dom(24), abre modal |
| /declaraciones | modal de «Consultar LIM008» | close | OK | dom(23) |
| /declaraciones | modal de «Consultar LIM008» | Imprimir | OK | dom(17) |
| /declaraciones | modal de «Consultar LIM008» | Excel | OK | dom(19), descarga |
| /declaraciones | modal de «Consultar LIM008» | Cerrar | OK | dom(23) |
| /declaraciones | pantalla | Imprimir LIM008 | OK | dom(16) |
| /declaraciones | pantalla | Excel LIM008 | OK | dom(18), descarga |
| /declaraciones | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /declaraciones | pantalla | 1 | actual | página/opción ya seleccionada |
| /declaraciones | pantalla | n-pagination-item n-pagination-item--button n-pagination-item--disable | deshabilitado |  |
| /parametrizacion | pantalla | Nueva definición | OK | dom(30), abre modal |
| /parametrizacion | modal de «Nueva definición» | close | OK | dom(29) |
| /parametrizacion | modal de «Nueva definición» | Mayor es mejor | OK | dom(39) |
| /parametrizacion | modal de «Nueva definición» | Cancelar | OK | dom(30) |
| /parametrizacion | modal de «Nueva definición» | Guardar | OK | dom(48) |
| /parametrizacion | pantalla | Código | OK | dom(18) |
| /parametrizacion | pantalla | Editar LIQ_PRIMERA_LINEA | OK | dom(30), abre modal |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | close | OK | dom(29) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Mayor es mejor | OK | dom(39) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Cancelar | OK | dom(30) |
| /parametrizacion | modal de «Editar LIQ_PRIMERA_LINEA» | Guardar | OK | dom(46) |
| /parametrizacion | pantalla | Editar MOROSIDAD_TOTAL | OK | dom(30), abre modal |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | close | OK | dom(29) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Mayor es mejor | OK | dom(39) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Cancelar | OK | dom(30) |
| /parametrizacion | modal de «Editar MOROSIDAD_TOTAL» | Guardar | OK | dom(46) |
| /cargar-insumos | pantalla | Elegir archivo | OK | selector de archivo |
| /cargar-insumos | pantalla | ✓ Validar | OK | dom(16) |
| /cargar-insumos | pantalla | Elegir archivo | OK | selector de archivo |
| /cargar-insumos | pantalla | ✓ Validar | OK | dom(16) |
