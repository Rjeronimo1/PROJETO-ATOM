// verificarSinais.js

const fs = require('fs');
const path = require('path');

const pastaSinais = path.join(__dirname, 'sinais');

function verificarSinais() {
  fs.readdir(pastaSinais, (err, arquivos) => {
    if (err) {
      console.error('Erro ao ler a pasta de sinais:', err);
      return;
    }

    arquivos.forEach((arquivo) => {
      if (arquivo.endsWith('.json')) {
        const caminhoCompleto = path.join(pastaSinais, arquivo);
        const conteudo = fs.readFileSync(caminhoCompleto, 'utf8');
        const sinal = JSON.parse(conteudo);
        console.log(`[✅ SINAL DETECTADO]`, sinal);

        // ⚠️ Aqui no futuro: conectar com MT5 e executar a ordem.

        // Excluir ou mover o arquivo após leitura:
        fs.unlinkSync(caminhoCompleto);
        console.log(`[🗑️ Arquivo removido] ${arquivo}`);
      }
    });
  });
}

// Executa a cada 5 segundos
setInterval(verificarSinais, 5000);
console.log('🟢 Verificador de sinais ativo...');
