// sheldonWatchFull.js — Atualizado para ciclo completo: escrever + sincronizar
import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';

const pastaMonitorada = path.resolve('src');
const tempoDebounce = 1500;
let timeout = null;

function executarCicloCompleto() {
  console.clear();
  console.log(`[Sheldon] 🔁 Detectada alteração — atualizando arquivos e GitHub...`);

  exec('node src/auto/sheldonWriter.js', (erro1) => {
    if (erro1) {
      console.error(`[Sheldon] ❌ Erro no Writer: ${erro1.message}`);
      return;
    }
    console.log(`[Sheldon] ✅ Código salvo com sucesso.`);

    exec('node src/auto/sheldonSync.js', (erro2) => {
      if (erro2) {
        console.error(`[Sheldon] ❌ Erro no Sync: ${erro2.message}`);
      } else {
        console.log(`[Sheldon] ✅ GitHub sincronizado com sucesso.`);
      }
    });
  });
}

console.log(`[Sheldon] 🟦 Sheldon em modo contínuo global (auto Writer + Sync)`);

chokidar.watch(pastaMonitorada, {
  ignored: /node_modules|\.git/,
  persistent: true,
  ignoreInitial: true
}).on('all', (evento, caminho) => {
  console.log(`[Sheldon] 📍 Modificação detectada em: ${caminho}`);
  clearTimeout(timeout);
  timeout = setTimeout(executarCicloCompleto, tempoDebounce);
});
