import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import App from './App.vue';
import { es } from './locale-es';
import { router } from './router';
import './style.css';

createApp(App)
    .use(router)
    .use(PrimeVue, {
        locale: es,
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark',
                cssLayer: { name: 'primevue', order: 'tailwind-base, primevue, tailwind-utilities' },
            },
        },
    })
    .use(ConfirmationService)
    .use(ToastService)
    .directive('tooltip', Tooltip)
    .mount('#app');
