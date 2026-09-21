import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

function cacheBustHtml(): Plugin {
  const version = Date.now().toString();

  return {
    name: 'cache-bust-html',
    transformIndexHtml(html) {
      return html.replaceAll('?ver=3-0-0', `?v=${version}`);
    }
  };
}

export default defineConfig({
  plugins: [react(), cacheBustHtml()],
  resolve: {
    alias: {
      '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
      '@application': fileURLToPath(new URL('./src/application', import.meta.url)),
      '@infrastructure': fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
      '@presentation': fileURLToPath(new URL('./src/presentation', import.meta.url))
    }
  },
  publicDir: 'assets/',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
