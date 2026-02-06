import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        // Esto asegura que si agregas módulos nuevos en el futuro, 
        // Tailwind detecte las clases de sus componentes internos
        './src/lib/modules/**/*.{svelte,ts}'
    ],

    theme: {
        extend: {
            // Aquí puedes definir tu paleta de colores corporativa
            colors: {
                tiger: {
                    black: '#0a0a0a',
                    orange: '#ff6b00',
                    white: '#f5f5f5'
                }
            }
        }
    },

    plugins: [forms] // El plugin de forms es vital para que tus Atoms de Input se vean bien
} satisfies Config;