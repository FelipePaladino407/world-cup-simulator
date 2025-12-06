/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#b91c1c",     // rojo principal
                primaryDark: "#7f1d1d", // rojo oscuro
                pitchGreen: "#14532d",  // verde cancha
            },
        },
    },
    plugins: [],
};
