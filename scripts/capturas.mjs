// Uso: node capturas.mjs [demo...]   -> PNG 1366x900 en docs/capturas/
import { join } from 'node:path';
import { abrirNavegador, DEMOS, levantar, RAIZ } from './comun.mjs';

const RUTAS = [
    ['login?expirada=1', 'login'],
    ['tablero', 'tablero'],
    ['parametros', 'parametros'],
    ['entidades', 'entidades'],
    ['reportes', 'reportes'],
    ['reportes?confirmar=1', 'confirmacion'],
    ['declaraciones', 'declaraciones'],
    ['parametrizacion', 'parametrizacion'],
    ['cargar-insumos', 'cargar-insumos'],
];
const demos = process.argv.slice(2).length ? process.argv.slice(2) : DEMOS;
const nav = await abrirNavegador();
let puerto = 4401;
for (const demo of demos) {
    const srv = await levantar(demo, puerto++);
    const pag = await nav.newPage({ viewport: { width: 1366, height: 900 } });
    for (const [ruta, nombre] of RUTAS) {
        await pag.goto(`${srv.url}/#/${ruta}`);
        await pag.reload({ waitUntil: 'networkidle' });
        await pag.waitForTimeout(1000);
        await pag.screenshot({ path: join(RAIZ, 'docs', 'capturas', `${demo}_${nombre}.png`) });
    }
    // Modal de edición de entidad (validación con campos vacíos)
    await pag.goto(`${srv.url}/#/entidades`);
    await pag.reload({ waitUntil: 'networkidle' });
    await pag.getByRole('button', { name: 'Nuevo', exact: true }).first().click();
    await pag.waitForTimeout(500);
    await pag.getByRole('button', { name: 'Guardar', exact: true }).first().click();
    await pag.waitForTimeout(800);
    await pag.screenshot({ path: join(RAIZ, 'docs', 'capturas', `${demo}_entidades-validacion.png`) });
    // Editor de límites colores
    await pag.goto(`${srv.url}/#/parametros`);
    await pag.reload({ waitUntil: 'networkidle' });
    await pag.getByRole('button', { name: 'Editar colores' }).first().click();
    await pag.waitForTimeout(800);
    await pag.screenshot({ path: join(RAIZ, 'docs', 'capturas', `${demo}_parametros-colores.png`) });
    await pag.close();
    srv.cerrar();
    console.log(`${demo}: ${RUTAS.length + 2} capturas`);
}
await nav.close();
