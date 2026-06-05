import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit(),
        SvelteKitPWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
            },
            manifest: {
                name: 'Reloj mundial',
                short_name: 'Reloj',
                description: 'Aplicación de reloj mundial interactiva',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone', 
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ]
});
