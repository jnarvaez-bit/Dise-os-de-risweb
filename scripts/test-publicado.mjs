// Comprueba la portada y las 8 rutas de cada demo (URL directa + F5).
// Uso:
//   node test-publicado.mjs              # contra vite preview local (requiere dist/)
//   node test-publicado.mjs --publicado  # contra GitHub Pages
import { abrirNavegador, DEMOS, levantar, ORIGEN_PUBLICO, RUTAS, urlHash, urlPublica } from './comun.mjs';

const publicado = process.argv.includes('--publicado');
const externosProhibidos = /webcoopec|coopcelica|desarrolloriskweb|riskwebcelica|\/var\/www/i;

async function revisarPagina(pag, url, etiqueta) {
    const consola = [];
    const fallosRed = [];
    const onCons = (m) => ['error', 'warning'].includes(m.type()) && consola.push({ tipo: m.type(), texto: m.text().slice(0, 300) });
    const onErr = (e) => consola.push({ tipo: 'error', texto: `pageerror: ${e.message}`.slice(0, 300) });
    const onReq = (res) => {
        const u = res.url();
        const st = res.status();
        if (st >= 400) fallosRed.push({ st, u, etiqueta });
    };
    pag.on('console', onCons);
    pag.on('pageerror', onErr);
    pag.on('response', onReq);
    const res = await pag.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await pag.waitForTimeout(400);
    const recarga = await pag.reload({ waitUntil: 'networkidle' });
    await pag.waitForTimeout(400);
    const http = recarga?.status() ?? res?.status() ?? 0;
    const jsOk = await pag.evaluate(() => !!document.getElementById('app') || document.body.innerText.length > 20);
    pag.off('console', onCons);
    pag.off('pageerror', onErr);
    pag.off('response', onReq);
    const ruidoCsp = /Content Security Policy directive 'frame-ancestors' is ignored/;
    const errores = consola.filter((c) => c.tipo === 'error' && !ruidoCsp.test(c.texto));
    const notFound = fallosRed.filter((f) => f.st === 404);
    return { etiqueta, url, http, jsOk, errores, avisos: consola.filter((c) => c.tipo === 'warning'), notFound, fallosRed, ok: http === 200 && jsOk && errores.length === 0 && notFound.length === 0 };
}

const nav = await abrirNavegador();
const resultados = [];
const servidores = [];

try {
    const landing = publicado ? `${ORIGEN_PUBLICO}/` : null;
    if (publicado) {
        const pag = await nav.newPage({ viewport: { width: 1366, height: 900 } });
        const r = await revisarPagina(pag, landing, 'portada');
        const hrefs = await pag.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.href));
        const malos = hrefs.filter((h) => externosProhibidos.test(h));
        if (malos.length) {
            r.ok = false;
            r.errores.push({ tipo: 'error', texto: `enlaces prohibidos: ${malos.join(', ')}` });
        }
        resultados.push(r);
        console.log(`portada: ${r.ok ? 'PASA' : 'FALLA'} HTTP ${r.http} errores ${r.errores.length} 404 ${r.notFound.length}`);
        await pag.close();
    }

    let puerto = 4601;
    for (const demo of DEMOS) {
        let origen;
        if (publicado) {
            origen = urlPublica(demo);
        } else {
            const srv = await levantar(demo, puerto++);
            servidores.push(srv);
            origen = srv.url;
        }
        const pag = await nav.newPage({ viewport: { width: 1366, height: 900 } });
        for (const ruta of RUTAS) {
            const r = await revisarPagina(pag, urlHash(origen, ruta), `${demo} ${ruta}`);
            resultados.push(r);
            const marca = r.ok ? 'PASA' : 'FALLA';
            console.log(`${demo} ${ruta}: ${marca} HTTP ${r.http} errores ${r.errores.length} 404 ${r.notFound.length}`);
            for (const e of r.errores) console.log(`   ERROR: ${e.texto}`);
            for (const f of r.notFound) console.log(`   404: ${f.u}`);
        }
        // El asset JS principal debe cargar (networkidle ya lo exige, comprobamos el script del index)
        const indexRes = await fetch(origen);
        const html = await indexRes.text();
        const m = html.match(/src="([^"]+\.js)"/);
        if (m) {
            const jsUrl = new URL(m[1], origen).href;
            const js = await fetch(jsUrl);
            const okJs = js.ok;
            console.log(`${demo} asset JS: ${okJs ? 'PASA' : 'FALLA'} ${js.status} ${jsUrl}`);
            if (!okJs) resultados.push({ etiqueta: `${demo} js`, url: jsUrl, http: js.status, jsOk: false, errores: [{ tipo: 'error', texto: 'JS no cargó' }], avisos: [], notFound: [], fallosRed: [], ok: false });
        }
        await pag.close();
    }
} finally {
    for (const s of servidores) s.cerrar();
    await nav.close();
}

const ok = resultados.every((r) => r.ok);
console.log(ok ? 'RESULTADO: PASA' : 'RESULTADO: FALLA');
process.exit(ok ? 0 : 1);
