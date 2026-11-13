import vue from '@vitejs/plugin-vue';
import { dirname, basename } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const carpeta = basename(dirname(fileURLToPath(import.meta.url)));
const csp =
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; base-uri 'self'; form-action 'self'; object-src 'none'";

export default defineConfig({
    base: process.env.VITE_BASE || `/Dise-os-de-risweb/${carpeta}/`,
    plugins: [
        vue(),
        {
            name: 'csp-meta',
            transformIndexHtml(html, ctx) {
                if (ctx.server) return html;
                if (html.includes('Content-Security-Policy')) return html;
                return html.replace(
                    '<meta charset="UTF-8" />',
                    `<meta charset="UTF-8" />\n        <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
                );
            },
        },
    ],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
