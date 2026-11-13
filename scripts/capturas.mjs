import puppeteer from 'puppeteer-core';
const [,, demo, port] = process.argv;
const out = new URL('../docs/capturas', import.meta.url).pathname;
const rutas = [['login?expirada=1','login'],['tablero','tablero'],['reportes','reportes'],['reportes?confirmar=1','confirmacion'],['cargar-insumos','cargar-insumos']];
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1366, height: 900 });
const errores = [];
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errores.push(`${m.type()}: ${m.text()}`); });
p.on('pageerror', (e) => errores.push('pageerror: ' + e.message));
for (const [r, n] of rutas) {
  await p.goto(`http://localhost:${port}/#/${r}`, { waitUntil: 'networkidle0' });
  await p.reload({ waitUntil: 'networkidle0' });
  await new Promise((s) => setTimeout(s, 1200));
  await p.screenshot({ path: `${out}/${demo}_${n}.png` });
}
console.log(demo, 'consola:', errores.length ? [...new Set(errores)].join('\n') : 'limpia');
await b.close();
