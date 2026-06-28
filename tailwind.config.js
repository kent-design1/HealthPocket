/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                ink: '#1C3A4B',       // deep teal-navy — the Carna wordmark
                muted: '#5B6675',
                canvas: '#EEF2F5',    // pale blue-grey background
                teal: '#2F9E91',      // primary accent
                emergency: '#B23A48',
            },
            fontFamily: {
                serif: ['Georgia'],   // we'll swap in a real serif later
            },
        },
    },
    plugins: [],
};