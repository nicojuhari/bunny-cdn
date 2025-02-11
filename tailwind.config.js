/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                'brand': {
                    '50': '#fef4f2',
                    '100': '#fde7e3',
                    '200': '#fdd3cb',
                    '300': '#fab5a7',
                    '400': '#f58a74',
                    '500': '#eb6348',
                    '600': '#d8472a',
                    '700': '#ae361e',
                    '800': '#96321e',
                    '900': '#7d2f1f',
                    '950': '#44150b',
                },
            },
        },
    },
    plugins: [],
};
