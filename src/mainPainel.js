/**********************************************************************
 * main.js — Inicialização do painel ATOM + histórico de logs
 * -------------------------------------------------------------------
 * 1) Mostra o histórico de logs em <ul id="lista-historico">
 * 2) Inicia o executor de setups cíclico
 *********************************************************************/

// main.js — Núcleo principal do ATOM
import "./auto/autoGitPush.js"; // Sincronização automática com GitHub
import { iniciarPainel } from "./ui/painel.js";
import { iniciarExecucao } from "./executor/executorMT5.js";
import { carregarConfiguracoes } from "./config/configuracoes.js";
import { monitorarEstrutura } from "./ai/motorTatico.js";

// Inicialização principal
async function iniciarATOM() {
  console.log("🚀 ATOM iniciado...");

  // Carregar configurações do sistema
  await carregarConfiguracoes();

  // Iniciar painel visual
  iniciarPainel();

  // Iniciar executor de ordens
  iniciarExecucao();

  // Iniciar motor tático de leitura SMC/ICT
  monitorarEstrutura();

  console.log("✅ Todos os módulos principais do ATOM estão ativos.");
}

// Executar
iniciarATOM();
