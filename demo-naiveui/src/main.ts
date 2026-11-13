import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './style.css';

// Naive UI inyecta sus estilos en <head>. Se inserta esta marca al final del <head>
// (después del CSS de Tailwind) para que el preflight de Tailwind no pise sus botones.
// Docs: https://www.naiveui.com/en-US/docs/style-conflict.md
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

createApp(App).use(router).mount('#app');
