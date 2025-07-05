// ==================================================
// AUDIO.JS — Módulo de Voz e Áudio para ATOM
// Versão: Alpha 1.0
// ==================================================

let synth        = window.speechSynthesis || null;
let vozPadrao    = null;
let vozSelecionada = null;
let pronto       = false;

// ---------- 1. CARREGAR VOZES DO SISTEMA ----------
function carregarVozes() {
  if (!synth) return console.warn("🔇 SpeechSynthesis não suportado.");

  const vozes = synth.getVoices();
  if (!vozes.length) {
    // Chrome precisa deste hack para popular a lista
    synth.addEventListener("voiceschanged", carregarVozes, { once: true });
    synth.getVoices(); // dispara carregamento
    return;
  }

  // Tenta PT-PT, PT-BR, EN-US nessa ordem
  vozSelecionada =
    vozes.find(v => v.lang === "pt-PT") ||
    vozes.find(v => v.lang === "pt-BR") ||
    vozes.find(v => v.lang.startsWith("en"));

  vozPadrao = vozes[0];
  pronto = true;
  console.log("🔊 Voz carregada:", vozSelecionada?.name || vozPadrao?.name);
}

// ---------- 2. FALAR TEXTO ----------
export function falarTexto(texto, force = false) {
  if (!synth) {
    console.warn("SpeechSynthesis não disponível neste browser.");
    return;
  }
  if (!pronto && !force) {
    console.warn("Voz ainda não carregada.");
    return;
  }

  synth.cancel(); // evita sobreposição
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang  = vozSelecionada?.lang || "pt-PT";
  utter.voice = vozSelecionada || vozPadrao;
  utter.rate  = 1.0;
  utter.pitch = 1.0;
  synth.speak(utter);
}

// ---------- 3. VOZ C-3PO (filtro de robô) ----------
export function falarC3PO(texto) {
  // Ajustes robóticos simples (grave + pausado)
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang  = "en-US";
  utter.pitch = 0.6;
  utter.rate  = 0.85;
  synth.speak(utter);
}

// ---------- 4. STOP ----------
export function pararFala() {
  synth && synth.cancel();
}

// ---------- 5. INICIALIZAÇÃO AUTOMÁTICA ----------
carregarVozes();
