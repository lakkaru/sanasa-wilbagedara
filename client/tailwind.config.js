/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Sanasa Brand Colors (Primary Blue: #079AE8)
        'sanasa-blue': {
          50: '#E6F4FF',
          100: '#CCE9FF',
          200: '#99D4FF',
          300: '#66C0FF',
          400: '#33ABFF',
          500: '#079AE8',
          600: '#0688CC',
          700: '#0573AD',
          800: '#045C88',
          900: '#034366',
        },
        'sanasa-gold': {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#D4A574',
          600: '#C49A6C',
          700: '#A67C52',
          800: '#8B5E3C',
          900: '#6D4C41',
        },
        'sanasa-green': {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#43A047',
          600: '#388E3C',
          700: '#2E7D32',
          800: '#27632A',
          900: '#1B4D1B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Sinhala', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
