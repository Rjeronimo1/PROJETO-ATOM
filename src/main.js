/**********************************************************************
 * main.js — Inicializador completo do núcleo ATOM
 * -------------------------------------------------------------------
 * Este módulo combina:
 * 1) Execução técnica do ATOM (IA, setups, MT5)
 * 2) Interface gráfica e painel visual
 * 3) Motor tático SMC/ICT
 * 4) Sincronização automática com GitHub
 *********************************************************************/

// 🔁 GitHub: sincronização automática de blocos criados
import "./auto/autoGitPush.js";

// 🔧 Núcleo técnico
import { iniciarIA }                     from "./ai/inteligencia.js";
import { iniciarExecutorDeSetups }      from "./executor/setupExecutor.js";
import { ATOM_CORE }                     from "./core/core.js";
import { falarTexto }                    from "./infra/audio.js";

// 💻 Integração com MT5
import {
  verificarInstalacaoTerminal,
  iniciarTerminalMT5,
  implantarEA
} from "./bridge/executorMT5.js";

// 🧠 Motor tático + painel visual
import { iniciarPainel }                from "./ui/painel.js";
import { monitorarEstrutura }          from "./ai/motorTatico.js";
import { carregarConfiguracoes }       from "./config/configuracoes.js";

/* -------------------------------------------------
 * Inicialização completa do ATOM
 * ------------------------------------------------*/
async function iniciarATOM() {
  console.log("🚀 ATOM iniciado...");

  // 🔄 Verifica readiness
  if (!ATOM_CORE.systemReady) {
    console.warn("⏳ Sistema ainda não pronto. Tentando novamente em 500 ms...");
    setTimeout(iniciarATOM, 500);
    return;
  }

  try {
    // ⚙️ Configurações do sistema
    await carregarConfiguracoes();

    // 💡 Inicialização de IA e setups
    iniciarIA();
    iniciarExecutorDeSetups();

    // 🖥️ Painel visual
    iniciarPainel();

    // 📊 Motor SMC/ICT
    monitorarEstrutura();

    // 🛠️ Conexão com MT5 e implantação do EA
    if (verificarInstalacaoTerminal()) {
      iniciarTerminalMT5();
      const caminhoEA = "C:/Users/rober/Documents/MetaTrader 5/MQL5/Experts/ATLAS_SMC_2.7_PRO.ex5";
      implantarEA(caminhoEA);
    }

    // 🗣️ Confirmação por voz
    falarTexto("ATOM inicializado com sucesso.");
    console.log("✅ Todos os módulos principais do ATOM estão ativos.");
  } catch (erro) {
    console.error("❌ Erro durante a inicialização do ATOM:", erro);
    falarTexto("Erro na inicialização do sistema.");
  }
}

// 🚀 Bootstrap final
iniciarATOM();
