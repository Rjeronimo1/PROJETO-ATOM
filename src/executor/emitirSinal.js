// emitirSinal.js — PADRÃO FINAL ATOM (CommonJS compatível)
const fs = require("fs");
const path = require("path");

// Caminho real do diretório de sinais do MT5 (ajustado para o teu sistema)
const pastaSinais = "C:/Users/rober/AppData/Roaming/MetaQuotes/Terminal/D0E8209F77C8CF37AD8BF550E51FF075/MQL5/Files/sinais/";

// Função principal para emitir sinal JSON
function emitirSinal({ tipo, symbol, volume, sl = 0, tp = 0 }) {
  if (!["buy", "sell"].includes(tipo)) {
    console.error("Tipo deve ser 'buy' ou 'sell'");
    return;
  }

  const nome = `${tipo}_${symbol}_${Date.now()}.json`;
  const sinal = {
    tipo,
    symbol,
    volume: volume.toFixed(2),
    sl: sl.toFixed(2),
    tp: tp.toFixed(2)
  };

  try {
    fs.writeFileSync(path.join(pastaSinais, nome), JSON.stringify(sinal, null, 2));
    console.log("✅ Sinal criado:", nome);
  } catch (err) {
    console.error("❌ Falha ao gravar sinal:", err.message);
  }
}

// Execução direta via terminal
if (require.main === module) {
  const [,, tipo = "buy", symbol = "EURUSD", volume = "0.01"] = process.argv;
  emitirSinal({ tipo, symbol, volume: parseFloat(volume) });
}

module.exports = { emitirSinal };
