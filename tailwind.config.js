module.exports = {
    // mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {
            colors: {
                'custom-text': '#282828',
                'custom-coral': '#FF7F50',
                'custom-blue' : '#3FBD82'
              },
              boxShadow: {
                'notclick': '0 4px #e5e5e5',
                'click': '0 4px #E45D2C',
              },
              margin: {
                '1%': '1%',
                '2%': '2%',
                '5%': '5%'
              },
              width: {
                '15%': '15%',
                '10%': '10%',
                '20%': '20%',
                '5%': '5%',
                '30%': '30%',
                '40%': '40%',
                '48%': '48%',
                '58%': '58%',
                '50%': '50%',
                '31%': '31.3%',
                '60%': '60%',
                '70%': '70%',
                '80%': '80%',
                '90%': '90%',
                '0.25' : '0.0625rem',
                '0.125' : '0.03125rem'
              },
              minHeight: {
                'custom-min-height': '8rem'
              },
              fontSize: {
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem',
              }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
