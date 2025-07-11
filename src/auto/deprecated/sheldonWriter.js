// sheldonWriter.js - Executor de escrita automática de arquivos do ATOM

import fs from 'fs';
import path from 'path';

function escreverArquivo(caminhoRelativo, conteudo) {
  const caminhoAbsoluto = path.resolve(caminhoRelativo);
  const pasta = path.dirname(caminhoAbsoluto);

  fs.mkdirSync(pasta, { recursive: true });

  fs.writeFileSync(caminhoAbsoluto, conteudo, 'utf8');

  console.log(`[SheldonWriter] Arquivo salvo em: ${caminhoRelativo}`);
}

// Conteúdo do motorTatico.js como string
const conteudoMotorTatico = `// motorTatico.js - Módulo tático de decisão do ATOM
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
    fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
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

      // Chamada para execução
      emitirComandoDeOrdem(dados);

    } catch (erro) {
      this.logar(\`Erro ao analisar sinal: \${erro.message}\`);
    }
  }
}
`;

escreverArquivo("src/core/motorTatico.js", conteudoMotorTatico);
