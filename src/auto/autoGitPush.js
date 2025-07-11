// src/auto/autoGitPush.js — Loop de commit automático horário
import { sincronizarGitAuto } from "./sheldonSync.js";

// Intervalo: 1 hora = 60 min × 60 s × 1000 ms = 3.600.000 ms
const INTERVALO_HORARIO = 3600000;

function iniciarLoopDePush() {
  console.log("⏱️ Git auto-push ativado a cada 1 hora...");
  sincronizarGitAuto(); // Primeira execução imediata

  setInterval(() => {
    console.log("⏳ Executando push automático...");
    sincronizarGitAuto();
  }, INTERVALO_HORARIO);
}

iniciarLoopDePush();
