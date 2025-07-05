/**********************************************************************
 * executorMT5.js — Executor de Ordens via arquivos-sinal
 * ------------------------------------------------------
 * Gera JSONs em /sinais que serão consumidos pela Bridge/MetaTrader.
 *********************************************************************/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Diretório onde a Bridge vigia sinais
const pastaSinais = path.resolve(__dirname, "../../sinais");

class ExecutorMT5 {
  constructor() {
    this.diretorio = pastaSinais;
    this.criarDiretorioSeNaoExistir();
  }

  criarDiretorioSeNaoExistir() {
    if (!fs.existsSync(this.diretorio)) {
      fs.mkdirSync(this.diretorio, { recursive: true });
    }
  }

  executar(acao = "compra", ativo = "EURUSD", volume = 0.10) {
    const sinal = {
      tipo: acao,
      parametros: { ativo, volume },
      ts: Date.now()
    };

    const nomeArquivo = `sinal_${acao}_${Date.now()}.json`;
    const caminho     = path.join(this.diretorio, nomeArquivo);

    fs.writeFileSync(caminho, JSON.stringify(sinal, null, 2));
    console.log(`📤 Sinal "${acao}" salvo em ${nomeArquivo}`);
  }

  enviarOrdem(tipo, dados = {}) {
    const { ativo = "EURUSD", volume = 0.10 } = dados;
    this.executar(tipo, ativo, volume);
  }

  fecharOrdem()        { console.log("⚠️  fecharOrdem não implementado"); }
  ajustarStop()        { console.log("⚠️  ajustarStop não implementado"); }
  pausarSistema()      { console.log("⏸️  Sistema MT5 pausado (stub)"); }
  retomarSistema()     { console.log("▶️  Sistema MT5 retomado (stub)"); }
  abrirEditor()        { console.log("🛠️  Abrir MetaEditor (stub)"); }
  enviarMsg()          { console.log("💬 enviarMsg (stub)"); }
}

// ✅ Exportação direta e correta
export { ExecutorMT5 };
