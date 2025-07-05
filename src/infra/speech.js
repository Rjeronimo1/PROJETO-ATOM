// speech.js — Módulo de Fala (Adaptado para Browser e Node)
// ATOM - Adaptive Tactical Operating Machine

let isBrowser = typeof window !== "undefined";

let falarTexto = (texto = "") => {
  console.log(`🗣️ (modo texto) ${texto}`);
};

if (isBrowser) {
  falarTexto = (texto = "") => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("⚠️ speechSynthesis não disponível no navegador.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-PT";
    synth.speak(utterance);
  };
}

export { falarTexto };
