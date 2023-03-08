import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sokolia/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    postcss: {
      plugins: [postcssNesting],
    }
  }
})
