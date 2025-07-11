// startSheldon.js — Ativa o Sheldon em modo total (escrita + monitoramento)

import './sheldonWatchFull.js'; // Atualização automática GitHub ao detectar mudanças
import { gravarArquivo } from './sheldonWriter.js'; // Escrita programática

// Aqui Sheldon já pode criar e gravar arquivos reais
// Exemplo real — motor tático
gravarArquivo(
  'src/core/motorTatico.js',
  `// motorTatico.js - Módulo tático de decisão do ATOM
import fs from 'fs';
import path from 'path';
import { emitirComandoDeOrdem } from '../../executor/executorMT5.js';

export default class MotorTatico {
  constructor() {
    this.sinaisPath = path.resolve('sinais', 'sinal_exemplo.json');
    this.logPath = path.resolve('logs', 'motorTatico.log');
  }

  logar(mensagem) {
    const entrada = \`\${new Date().toISOString()} | \${mensagem}\\n\`;
    fs.appendFileSync(this.logPath, entrada);
    console.log(\`[MotorTatico] \${mensagem}\`);
  }

  analisarSinal() {
    try {
      if (!fs.existsSync(this.sinaisPath)) {
        this.logar('Nenhum sinal encontrado.');
        return;
      }

      const dados = JSON.parse(fs.readFileSync(this.sinaisPath, 'utf8'));

      if (!dados || !dados.tipo || !dados.ativo) {
        this.logar('Sinal inválido ou incompleto.');
        return;
      }

      this.logar(\`Sinal recebido: \${dados.tipo} no ativo \${dados.ativo}\`);
      emitirComandoDeOrdem(dados);
    } catch (erro) {
      this.logar(\`Erro ao analisar sinal: \${erro.message}\`);
    }
  }
}`
);
