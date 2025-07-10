// src/auto/sheldonSync.js
import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const caminhoMonitorado = path.resolve('src/executor');

console.log("🟢 Sheldon ativo em modo contínuo.");
console.log("📁 Monitorando:", caminhoMonitorado);

const watcher = chokidar.watch(caminhoMonitorado, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('change', (filePath) => {
  const nomeArquivo = path.basename(filePath);
  console.log(`📝 Alteração detectada em: ${nomeArquivo}`);

  exec(`
    git add .
    git commit -m "Atualização automática: ${nomeArquivo}"
    git push
  `, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erro ao sincronizar:", stderr);
    } else {
      console.log("✅ Sincronização concluída:", stdout);
    }
  });
});
