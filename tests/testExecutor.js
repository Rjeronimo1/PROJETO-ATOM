/************************************************************************
 * tests/testExecutor.js
 * ------------------------------------------------------------
 * Teste unitário: executa uma ordem de compra via roteador ATOM,
 * usando o módulo oficial de comandos (infra/comandos.js).
 ************************************************************************/

import { executarComando } from "../src/infra/comandos.js";

// Simula uma ordem de compra no par XAUUSD com 0.20 lote
executarComando("comprar", {
  ativo:  "XAUUSD",
  volume: 0.20
});

// Finaliza o teste após 2 s
setTimeout(() => {
  console.log("✅ Teste concluído.");
  process.exit(0);
}, 2000);
