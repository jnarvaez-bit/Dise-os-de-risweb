// Prueba automática de botones (Playwright + Chrome del sistema).
// Para cada demo: visita todas las rutas del menú, hace clic en cada elemento clicable visible
// (botones, enlaces, ítems de menú, combos, encabezados ordenables, paginación) y, si se abre un
// modal, también en cada botón del modal. Falla si:
//   - un clic no produce efecto visible (cambio en el DOM fuera del propio botón, cambio de URL o descarga), o
//   - hay errores en la consola del navegador.
// Uso: node test-botones.mjs [demo...]      Resultado: docs/prueba-botones.md y docs/prueba-botones.json
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { abrirNavegador, DEMOS, levantar, RAIZ, RUTAS } from './comun.mjs';

const CLICABLES = [
    'button', 'a[href]', '[role=button]', '[role=menuitem]', '[role=treeitem]', '[role=tab]', '[role=combobox]', '[role=switch]',
    '[role=checkbox]', 'th[aria-sort]', '.p-datatable-sortable-column', '.n-data-table-th--sortable', '.n-pagination-item',
    '.n-menu-item-content', '.n-base-selection', '.p-panelmenu-header-content',
].join(',');
const CROMO = 'aside, header, nav, [data-sidebar], .n-layout-sider, .n-layout-header';
const SELECTOR_DIALOGO = '[role=dialog], [role=alertdialog]';
const NO_DIALOGO = '.p-datepicker-panel, .n-date-panel, [data-reka-popper-content-wrapper], .p-select-overlay';

// Se ejecuta en el navegador: marca los clicables visibles con data-qa y devuelve su descripción.
function descubrir({ CLICABLES, CROMO, ambito, NO_DIALOGO }) {
    const raiz = ambito
        ? [...document.querySelectorAll(ambito)].filter((d) => !d.closest(NO_DIALOGO) && d.getBoundingClientRect().width > 0).pop()
        : document.body;
    if (!raiz) return [];
    const visible = (el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('[aria-hidden=true]');
    };
    let els = [...raiz.querySelectorAll(CLICABLES)].filter(visible);
    if (!ambito) els = els.filter((el) => !el.closest(NO_DIALOGO) && !el.closest('[role=dialog],[role=alertdialog]'));
    els = els.filter((el) => !els.some((o) => o !== el && o.contains(el)));
    document.querySelectorAll('[data-qa]').forEach((e) => e.removeAttribute('data-qa'));
    return els.map((el, i) => {
        el.setAttribute('data-qa', String(i));
        const etiqueta = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title') || el.querySelector('[aria-label]')?.getAttribute('aria-label') || el.className || el.tagName)
            .toString().trim().replace(/\s+/g, ' ').slice(0, 70);
        return {
            i,
            etiqueta,
            cromo: !!el.closest(CROMO),
            enTabla: !!el.closest('tbody, [role=row]'),
            activo: el.getAttribute('aria-current') === 'page' || /(paginator-page-selected|pagination-item--active|menu-item-content--selected)\b/.test(el.className?.toString?.() ?? '') ||
                !!el.querySelector('.n-menu-item-content--selected'),
            deshabilitado: el.disabled === true || el.getAttribute('aria-disabled') === 'true' || el.getAttribute('data-disabled') !== null ||
                /(--disabled|p-disabled)\b/.test(el.className?.toString?.() ?? ''),
        };
    });
}

// Observa mutaciones del DOM fuera del elemento clicado (ignora tooltips).
function iniciarObservador(i) {
    const clic = document.querySelector(`[data-qa="${i}"]`);
    window.__mut = 0;
    window.__propio = 0;
    window.__obs?.disconnect();
    // Interruptores/casillas: su efecto visible es su propio estado (aria-checked).
    const cuentaPropio = !!clic?.matches?.('[role=switch], [role=checkbox], [role=tab]');
    const esTooltip = (n) => n.nodeType === 1 && (n.matches?.('[role=tooltip], .p-tooltip') || n.closest?.('[role=tooltip], .p-tooltip'));
    window.__obs = new MutationObserver((lista) => {
        for (const m of lista) {
            if (clic && (m.target === clic || clic.contains(m.target))) {
                if (cuentaPropio) window.__propio++;
                continue;
            }
            if (m.type === 'attributes' && m.attributeName === 'data-qa') continue;
            if (m.type === 'childList' && [...m.addedNodes, ...m.removedNodes].every(esTooltip) && m.addedNodes.length + m.removedNodes.length > 0) continue;
            if (m.type === 'attributes' && esTooltip(m.target)) continue;
            window.__mut++;
        }
    });
    window.__obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
}

async function probarDemo(nav, demo, puerto) {
    const srv = await levantar(demo, puerto);
    const ctx = await nav.newContext({ viewport: { width: 1366, height: 900 }, acceptDownloads: true });
    const pag = await ctx.newPage();
    const consola = [];
    pag.on('console', (m) => ['error', 'warning'].includes(m.type()) && consola.push({ tipo: m.type(), texto: m.text().slice(0, 300), url: pag.url() }));
    pag.on('pageerror', (e) => consola.push({ tipo: 'error', texto: `pageerror: ${e.message}`.slice(0, 300), url: pag.url() }));
    let descargas = 0;
    pag.on('download', () => descargas++);
    let selectores = 0;
    pag.on('filechooser', () => selectores++);

    const fresco = async (ruta) => {
        await pag.goto(`${srv.url}/#${ruta}`);
        await pag.reload({ waitUntil: 'networkidle' });
        await pag.waitForTimeout(350);
        for (const inp of await pag.locator('input[type=file]').all()) {
            await inp.setInputFiles({ name: 'insumo_ejemplo.zip', mimeType: 'application/zip', buffer: Buffer.from('PK ejemplo') }).catch(() => {});
        }
        await pag.waitForTimeout(150);
    };
    const contarDialogos = () =>
        pag.evaluate(({ s, n }) => [...document.querySelectorAll(s)].filter((d) => !d.closest(n) && d.getBoundingClientRect().width > 0).length, { s: SELECTOR_DIALOGO, n: NO_DIALOGO });
    const clicYObservar = async (i) => {
        const dlg0 = await contarDialogos();
        await pag.evaluate(iniciarObservador, i);
        const url0 = pag.url();
        const d0 = descargas;
        const s0 = selectores;
        await pag.locator(`[data-qa="${i}"]`).click({ timeout: 4000 });
        await pag.waitForTimeout(700);
        const mut = await pag.evaluate(() => window.__mut);
        const propio = await pag.evaluate(() => window.__propio);
        const dlg1 = await contarDialogos();
        const dialogo = dlg1 > 0;
        const efecto = [];
        if (mut > 0) efecto.push(`dom(${mut})`);
        if (pag.url() !== url0) efecto.push(`navega ${pag.url().split('#')[1]}`);
        if (descargas > d0) efecto.push('descarga');
        if (propio > 0) efecto.push('cambia su estado');
        if (dlg1 > dlg0) efecto.push('abre modal');
        if (selectores > s0) efecto.push('selector de archivo');
        return { ok: efecto.length > 0, efecto: efecto.join(', '), dialogo };
    };

    const resultados = [];
    const vistosCromo = new Set();
    const vistosTabla = new Map();
    for (const ruta of RUTAS) {
        await fresco(ruta);
        const cands = await pag.evaluate(descubrir, { CLICABLES, CROMO, ambito: null, NO_DIALOGO });
        for (const c of cands) {
            const base = { ruta, nivel: 'pantalla', etiqueta: c.etiqueta };
            if (c.cromo) {
                if (vistosCromo.has(c.etiqueta)) continue;
                vistosCromo.add(c.etiqueta);
            }
            if (c.enTabla) {
                const k = `${ruta}|${c.etiqueta.split(' ')[0]}`;
                if ((vistosTabla.get(k) ?? 0) >= 2) continue;
                vistosTabla.set(k, (vistosTabla.get(k) ?? 0) + 1);
            }
            if (c.deshabilitado) {
                resultados.push({ ...base, estado: 'deshabilitado' });
                continue;
            }
            if (c.activo) {
                resultados.push({ ...base, estado: 'actual', efecto: 'página/opción ya seleccionada' });
                continue;
            }
            try {
                await fresco(ruta);
                const ahora = await pag.evaluate(descubrir, { CLICABLES, CROMO, ambito: null, NO_DIALOGO });
                if (ahora[c.i]?.etiqueta !== c.etiqueta) {
                    resultados.push({ ...base, estado: 'FALLA', efecto: 'no se pudo volver a ubicar el elemento' });
                    continue;
                }
                const r = await clicYObservar(c.i);
                resultados.push({ ...base, estado: r.ok ? 'OK' : 'FALLA', efecto: r.efecto || 'sin efecto visible' });
                if (r.dialogo) {
                    const enDialogo = await pag.evaluate(descubrir, { CLICABLES, CROMO, ambito: SELECTOR_DIALOGO, NO_DIALOGO });
                    for (const d of enDialogo) {
                        const b2 = { ruta, nivel: `modal de «${c.etiqueta}»`, etiqueta: d.etiqueta };
                        if (d.deshabilitado) {
                            resultados.push({ ...b2, estado: 'deshabilitado' });
                            continue;
                        }
                        try {
                            await fresco(ruta);
                            await pag.evaluate(descubrir, { CLICABLES, CROMO, ambito: null, NO_DIALOGO });
                            await pag.locator(`[data-qa="${c.i}"]`).click({ timeout: 4000 });
                            await pag.waitForTimeout(600);
                            const otra = await pag.evaluate(descubrir, { CLICABLES, CROMO, ambito: SELECTOR_DIALOGO, NO_DIALOGO });
                            const idx = otra.findIndex((o) => o.etiqueta === d.etiqueta);
                            if (idx < 0) {
                                resultados.push({ ...b2, estado: 'FALLA', efecto: 'no se pudo volver a ubicar el botón del modal' });
                                continue;
                            }
                            const r2 = await clicYObservar(otra[idx].i);
                            resultados.push({ ...b2, estado: r2.ok ? 'OK' : 'FALLA', efecto: r2.efecto || 'sin efecto visible' });
                        } catch (e) {
                            resultados.push({ ...b2, estado: 'FALLA', efecto: `error: ${e.message.split('\n')[0]}` });
                        }
                    }
                }
            } catch (e) {
                resultados.push({ ...base, estado: 'FALLA', efecto: `error: ${e.message.split('\n')[0]}` });
            }
        }
    }
    await ctx.close();
    srv.cerrar();
    const errores = consola.filter((c) => c.tipo === 'error');
    const avisos = consola.filter((c) => c.tipo === 'warning');
    const fallas = resultados.filter((r) => r.estado === 'FALLA');
    return { demo, rutas: RUTAS.length, resultados, fallas, errores, avisos, ok: fallas.length === 0 && errores.length === 0 };
}

const demos = process.argv.slice(2).length ? process.argv.slice(2) : DEMOS;
const nav = await abrirNavegador();
const todos = [];
let puerto = 4501;
for (const demo of demos) {
    const t0 = Date.now();
    const r = await probarDemo(nav, demo, puerto++);
    r.segundos = Math.round((Date.now() - t0) / 1000);
    todos.push(r);
    const n = (e) => r.resultados.filter((x) => x.estado === e).length;
    console.log(`${demo}: ${r.ok ? 'PASA' : 'FALLA'} · rutas ${r.rutas} · clics OK ${n('OK')} · fallas ${n('FALLA')} · deshabilitados ${n('deshabilitado')} · errores consola ${r.errores.length} · avisos ${r.avisos.length} · ${r.segundos}s`);
    for (const f of r.fallas) console.log(`   FALLA ${f.ruta} [${f.nivel}] «${f.etiqueta}»: ${f.efecto}`);
    for (const e of r.errores.slice(0, 10)) console.log(`   ERROR consola (${e.url.split('#')[1]}): ${e.texto}`);
}
await nav.close();
// Si se probaron solo algunos demos, se conservan los resultados anteriores de los demás.
const previo = join(RAIZ, 'docs', 'prueba-botones.json');
if (process.argv.slice(2).length && existsSync(previo)) {
    for (const viejo of JSON.parse(readFileSync(previo, 'utf8'))) if (!todos.some((t) => t.demo === viejo.demo)) todos.push(viejo);
    todos.sort((a, b) => DEMOS.indexOf(a.demo) - DEMOS.indexOf(b.demo));
}

const fecha = new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' });
let md = `# Resultado de la prueba de botones\n\nFecha: ${fecha} (hora de Ecuador). Script: \`scripts/test-botones.mjs\`.\n\n`;
md += '| Demo | Resultado | Rutas | Clics OK | Fallas | Deshabilitados | Errores consola | Avisos consola |\n|---|---|---|---|---|---|---|---|\n';
for (const r of todos) {
    const n = (e) => r.resultados.filter((x) => x.estado === e).length;
    md += `| ${r.demo} | ${r.ok ? '✅ PASA' : '❌ FALLA'} | ${r.rutas} | ${n('OK')} | ${n('FALLA')} | ${n('deshabilitado')} | ${r.errores.length} | ${r.avisos.length} |\n`;
}
md += '\nCriterio: un clic es OK si cambia el DOM fuera del propio botón, cambia la URL, inicia una descarga o abre un modal. Los elementos del menú lateral/encabezado se prueban una vez; las acciones por fila, en 2 filas por pantalla.\n';
for (const r of todos) {
    md += `\n## ${r.demo}\n\n| Ruta | Nivel | Elemento | Estado | Efecto |\n|---|---|---|---|---|\n`;
    for (const x of r.resultados) md += `| ${x.ruta} | ${x.nivel} | ${x.etiqueta.replace(/\|/g, '/')} | ${x.estado} | ${x.efecto ?? ''} |\n`;
    if (r.errores.length) md += `\nErrores de consola:\n${r.errores.map((e) => `- ${e.texto}`).join('\n')}\n`;
    if (r.avisos.length) md += `\nAvisos de consola:\n${[...new Set(r.avisos.map((e) => e.texto))].map((t) => `- ${t}`).join('\n')}\n`;
}
writeFileSync(join(RAIZ, 'docs', 'prueba-botones.md'), md);
writeFileSync(join(RAIZ, 'docs', 'prueba-botones.json'), JSON.stringify(todos, null, 2));
process.exit(todos.every((r) => r.ok) ? 0 : 1);
