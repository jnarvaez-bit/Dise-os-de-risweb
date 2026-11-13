// Utilidades compartidas: levantar "vite preview" de un demo y abrir Chrome con Playwright.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DEMOS = ['demo-primevue4', 'demo-shadcn-vue', 'demo-naiveui'];
export const RUTAS = ['/login', '/tablero', '/parametros', '/entidades', '/reportes', '/declaraciones', '/parametrizacion', '/cargar-insumos'];

export async function levantar(demo, puerto) {
    const dir = join(RAIZ, demo);
    if (!existsSync(join(dir, 'dist', 'index.html'))) throw new Error(`${demo}: falta dist/. Ejecute "npm run build" primero.`);
    const proc = spawn(join(dir, 'node_modules', '.bin', 'vite'), ['preview', '--port', String(puerto), '--strictPort'], { cwd: dir, stdio: 'ignore' });
    const url = `http://localhost:${puerto}`;
    for (let i = 0; i < 50; i++) {
        try {
            if ((await fetch(url)).ok) return { url, cerrar: () => proc.kill() };
        } catch {
            /* esperando */
        }
        await new Promise((r) => setTimeout(r, 200));
    }
    proc.kill();
    throw new Error(`${demo}: vite preview no respondió en ${url}`);
}

export async function abrirNavegador() {
    const executablePath = process.env.CHROME_PATH || ['/usr/bin/google-chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => existsSync(p));
    return chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
}
