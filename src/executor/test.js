/* src/executor/test.js
   Gera ordens-exemplo em .../MQL5/Files/sinais/                  */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ―― caminho absoluto para a pasta /sinais -----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ajuste se precisar mudar a pasta:
const sinaisDir = path.resolve(
  __dirname,
  "../../..",                   // volta para raiz do repo
  "sinais"                      // mesma pasta que o server monitora
);

// garante que a pasta exista
fs.mkdirSync(sinaisDir, { recursive: true });

// utilitário rápido para gravar um JSON
function escreverSinal(nome, objeto) {
  const json = JSON.stringify(objeto, null, 2);
  const arquivo = path.join(sinaisDir, `${nome}.json`);
  fs.writeFileSync(arquivo, json, "utf8");
  console.log("✔️  Gerado:", arquivo);
}

// exemplos ----------------------------------------------------------------
escreverSinal("sinal_buy", {
  tipo: "buy",
  parametros: { volume: 0.10 }
});

escreverSinal("sinal_sell", {
  tipo: "sell",
  parametros: { volume: 0.10 }
});

escreverSinal("sinal_fechar", {
  tipo: "fechar"
});

console.log("\nTodos os sinais-exemplo foram escritos.\n");
