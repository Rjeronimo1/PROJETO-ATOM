// autoGitPush.js — Sincronização automática com o GitHub a cada 1 hora
const { exec } = require("child_process");

// Função principal de sincronização
function autoSyncGit() {
  const hora = new Date().toLocaleTimeString("pt-PT", { hour12: false });
  console.log(`[${hora}] 🔄 Iniciando sincronização automática com GitHub...`);

  exec(`git add . && git commit -m "Auto sync ATOM [${hora}]" && git push`, (err, stdout, stderr) => {
    if (err) {
      if (stderr.includes("nothing to commit")) {
        console.log(`[${hora}] ⚠️ Nenhuma alteração detectada para commit.`);
      } else {
        console.error(`[${hora}] ❌ Erro ao sincronizar com GitHub:\n${stderr}`);
      }
    } else {
      console.log(`[${hora}] ✅ GitHub sincronizado com sucesso!\n${stdout}`);
    }
  });
}

// Executa a cada 1 hora (3600000 milissegundos)
setInterval(autoSyncGit, 3600000);

// Executa imediatamente na inicialização
autoSyncGit();
