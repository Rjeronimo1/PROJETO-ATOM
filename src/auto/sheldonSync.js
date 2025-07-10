// sheldonSync.js - Modo contínuo ATOM ativado por Sheldon em 2025-07-10T20:03:35.838389

import { writeFileSync, appendFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const projetoPath = path.resolve(); // raiz do projeto
const logPath = path.join(projetoPath, 'log_sheldon.txt');

// Lista de arquivos que Sheldon pode gravar automaticamente
const arquivos = [
  {
    nome: 'motorTatico.js',
    caminho: path.join(projetoPath, 'src', 'core', 'motorTatico.js'),
    conteudo: `// motorTatico.js gerado automaticamente\nexport default class MotorTatico {}`
  },
  // Adicione mais blocos conforme Sheldon escrever
];

function gravarEAtualizarGit(arquivo) {
  try {
    writeFileSync(arquivo.caminho, arquivo.conteudo);
    execSync('git add .', { cwd: projetoPath });
    execSync(`git commit -m "Sheldon: atualização automática de ${arquivo.nome}"`, { cwd: projetoPath });
    execSync('git push', { cwd: projetoPath });
    appendFileSync(logPath, `${new Date().toISOString()} | Atualizado: ${arquivo.nome}\n`);
    console.log(`[OK] ${arquivo.nome} salvo e enviado para o GitHub.`);
  } catch (erro) {
    console.error(`[ERRO] Falha ao atualizar ${arquivo.nome}:`, erro.message);
    appendFileSync(logPath, `${new Date().toISOString()} | ERRO: ${erro.message}\n`);
  }
}

// Modo contínuo: verifica a cada hora
setInterval(() => {
  arquivos.forEach(gravarEAtualizarGit);
}, 1000 * 60 * 60); // 1 hora

console.log("🟢 Sheldon ativo em modo contínuo.");
