import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  outDir: '/tmp/astro-dist',
  server: {
    host: true,
    allowedHosts: process.env.DEV_ALLOWED_HOSTS
      ? process.env.DEV_ALLOWED_HOSTS.split(',').map(h => h.trim())
      : true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
});
