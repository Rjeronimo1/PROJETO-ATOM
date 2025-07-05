// vite.config.js  –  aponta o Vite para a pasta correta do ATOM
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 👉 aqui informamos ao Vite que o index.html vive em src/ui
  root: resolve(__dirname, 'src/ui'),

  // (opcional) pasta de saída quando executar `vite build`
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },

  // (opcional) ajustes do servidor de desenvolvimento
  server: {
    port: 5174,   // manter a porta que ele já escolheu
    open: true,   // abrir o browser automaticamente
  },
});
