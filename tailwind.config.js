const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
            },
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
};
