// sheldonWatchFull.js - Modo contínuo global ATOM ativado por Sheldon

import chokidar from 'chokidar';
import { execSync } from 'child_process';
import { appendFileSync } from 'fs';
import path from 'path';

const projetoPath = path.resolve();
const logPath = path.join(projetoPath, 'log_sheldon.txt');

// Pastas e arquivos a monitorar
const incluir = ['src', 'sinais', 'books', 'mql5', 'logs', 'tests', 'config', 'atom'];
const ignorar = ['node_modules', '.git', 'videos'];

// Filtro de extensões a ignorar
const ignorarExtensoes = ['.log', '.tmp', '.DS_Store'];

function logar(msg) {
  const linha = `${new Date().toISOString()} | ${msg}\n`;
  appendFileSync(logPath, linha);
  console.log(`[Sheldon] ${msg}`);
}

function executarGitAuto(filepath) {
  try {
    execSync('git add .', { cwd: projetoPath });
    execSync(`git commit -m "Sheldon: atualização automática (${filepath})"`, { cwd: projetoPath });
    execSync('git push', { cwd: projetoPath });
    logar(`Atualização enviada para o GitHub: ${filepath}`);
  } catch (erro) {
    logar(`ERRO ao tentar atualizar ${filepath}: ${erro.message}`);
  }
}

function deveMonitorar(filePath) {
  const relativo = path.relative(projetoPath, filePath);
  if (ignorar.some(p => relativo.includes(p))) return false;
  if (ignorarExtensoes.some(ext => relativo.endsWith(ext))) return false;
  return true;
}

logar('🔁 Sheldon em modo contínuo global (watch full)');

const watcher = chokidar.watch(incluir.map(p => path.join(projetoPath, p)), {
  ignored: /(^|[\\/])\../, // ignora arquivos ocultos
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on('change', filepath => {
    if (!deveMonitorar(filepath)) return;
    logar(`Alteração detectada em: ${filepath}`);
    executarGitAuto(filepath);
  })
  .on('add', filepath => {
    if (!deveMonitorar(filepath)) return;
    logar(`Novo arquivo adicionado: ${filepath}`);
    executarGitAuto(filepath);
  })
  .on('unlink', filepath => {
    if (!deveMonitorar(filepath)) return;
    logar(`Arquivo removido: ${filepath}`);
    executarGitAuto(filepath);
  });
