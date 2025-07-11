// src/auto/sheldonSync.js
import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const raizProjeto = path.resolve('.');
const arquivosPermitidos = ['.js', '.json', '.mq5', '.css', '.html'];
const pastaMonitorada = path.join(raizProjeto, 'src');

console.log("🟢 [SheldonSync] Ativo – Monitorando alterações no projeto completo");

const watcher = chokidar.watch(pastaMonitorada, {
  ignored: (caminho) => caminho.includes('node_modules') || caminho.includes('.git'),
  persistent: true,
  ignoreInitial: true
});

watcher.on('change', (arquivoModificado) => {
  const ext = path.extname(arquivoModificado);
  if (!arquivosPermitidos.includes(ext)) return;

  const nome = path.relative(raizProjeto, arquivoModificado);
  console.log(`📝 Alteração detectada em: ${nome}`);
  
  exec(`git add "${arquivoModificado}" && git commit -m "🚀 Sync automático: ${nome}" && git push`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erro no sync:", stderr);
    } else {
      console.log("✅ Commit e push realizados com sucesso.");
    }
  });
});
