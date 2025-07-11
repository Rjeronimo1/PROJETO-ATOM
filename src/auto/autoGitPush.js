// src/auto/autoGitPush.js — Sincronização automática com GitHub (versão ES Modules)
// -----------------------------------------------------------------------------

import { exec } from "child_process";
import { setInterval } from "timers";

// Função de push automático
function sincronizarComGitHub() {
  console.log("🌀 Verificando atualizações para commit...");

  const comando = `
    git add src/
    git commit -m "🔁 Atualização automática dos módulos do ATOM"
    git push
  `;

  exec(comando, (erro, stdout, stderr) => {
    if (erro) {
      console.error("❌ Erro ao executar push automático:", erro.message);
      return;
    }
    if (stderr) console.warn("⚠️ Saída padrão de erro:", stderr);
    if (stdout) console.log("✅ Resultado do push:\n", stdout);
  });
}

// Executa a cada 1h (3600000 ms)
setInterval(sincronizarComGitHub, 3600000);
