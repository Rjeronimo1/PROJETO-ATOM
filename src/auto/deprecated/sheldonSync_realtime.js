// sheldonSync_realtime.js - Modo tempo real ATOM

import { watchFile, writeFileSync, appendFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const projetoPath = path.resolve();
const logPath = path.join(projetoPath, 'log_sheldon.txt');

// Lista de arquivos monitorados por Sheldon
const arquivos = [
  {
    nome: 'motorTatico.js',
    caminho: path.join(projetoPath, 'src', 'core', 'motorTatico.js')
  },
  {
    nome: 'executorMT5.js',
    caminho: path.join(projetoPath, 'src', 'executor', 'executorMT5.js')
  }
];

function sincronizarArquivo(arquivo) {
  try {
    execSync('git add .', { cwd: projetoPath });
    execSync(`git commit -m "Sheldon: atualização automática de ${arquivo.nome}"`, { cwd: projetoPath });
    execSync('git push', { cwd: projetoPath });
    appendFileSync(logPath, `${new Date().toISOString()} | Atualizado em tempo real: ${arquivo.nome}
`);
    console.log(`[REALTIME] Atualização enviada: ${arquivo.nome}`);
  } catch (erro) {
    appendFileSync(logPath, `${new Date().toISOString()} | ERRO realtime ${arquivo.nome}: ${erro.message}
`);
    console.error(`[ERRO] Falha ao sincronizar ${arquivo.nome}:`, erro.message);
  }
}

arquivos.forEach((arquivo) => {
  if (existsSync(arquivo.caminho)) {
    watchFile(arquivo.caminho, { interval: 1000 }, () => {
      sincronizarArquivo(arquivo);
    });
    console.log(`[👁️] Monitorando ${arquivo.nome} para atualizações em tempo real.`);
  }
});
