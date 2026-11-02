/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
                sans: ['var(--font-sans)', '-apple-system', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
            },
            colors: {
                paper: '#F1EEE7',
                ink: '#25251F',
                electric: '#536BFA',
                stone: '#B9B5AA',
                sage: '#82968A',
                void: '#111318',
                surface: '#1B202A',
                cream: '#DCDDD9',
                glowlow: '#7189FF',
            },
        }
    },
    plugins: [],
};
