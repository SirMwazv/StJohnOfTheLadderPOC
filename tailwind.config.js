module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'byzantine': {
          50: '#F5F2ED',  // Background
          100: '#E8DED1', // Light brown
          200: '#8B7355', // Medium brown
          300: '#6B573D', // Dark brown
          400: '#4A3728', // Text brown
          500: '#2C1810', // Deep brown
        }
      },
      maxWidth: {
        '7xl': '80rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    }
  },
  plugins: [],
}