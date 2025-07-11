// src/auto/atualizador.js

import { writeFileSync, appendFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Caminho absoluto para o projeto
const projetoPath = path.resolve(); // raiz do projeto
const corePath = path.join(projetoPath, 'src', 'core', 'motorTatico.js');
const logPath = path.join(projetoPath, 'log_sheldon.txt');

// Conteúdo automático a ser salvo
const codigoMotor = `
// motorTatico.js - Gerado automaticamente por Sheldon
export default class MotorTatico {
  constructor() {
    this.estado = "ativo";
  }

  executarEntrada(estrutura, contexto) {
    if (estrutura === "BOS" && contexto === "liquidez") {
      return "EXECUTAR_COMPRA";
    }
    return "AGUARDAR_CONFIRMACAO";
  }
}
`;

try {
  // 1. Criar ou sobrescrever o arquivo motorTatico.js
  writeFileSync(corePath, codigoMotor);
  console.log("[OK] Arquivo salvo em:", corePath);

  // 2. Git add, commit e push
  execSync('git add .', { cwd: projetoPath });
  execSync('git commit -m "Sheldon: atualização automática do motorTatico.js"', { cwd: projetoPath });
  execSync('git push', { cwd: projetoPath });

  // 3. Log local
  const agora = new Date().toISOString();
  appendFileSync(logPath, `${agora} | Atualização automática do motorTatico.js\n`);

  console.log("[OK] Commit e push executados com sucesso.");
} catch (erro) {
  console.error("[ERRO] Falha na automação:", erro.message);
  const agora = new Date().toISOString();
  appendFileSync(logPath, `${agora} | ERRO: ${erro.message}\n`);
}
