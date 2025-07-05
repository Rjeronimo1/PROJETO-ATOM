// =============================================================================
// MEMÓRIA OPERACIONAL LOCAL — ATOM
// memoria.js  •  Versão Alpha-1.1 (browser + node, sem fs/path)
// =============================================================================

const CHAVE_MEMORIA = "ATOM_MEMORIA_TATICA";

// Detecta ambiente
const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

// Fallback simples para Node.js (apenas em memória)
const memoryStore = {};

const storage = isBrowser
  ? window.localStorage
  : {
      getItem: key => (memoryStore[key] ? JSON.stringify(memoryStore[key]) : null),
      setItem: (key, value) => {
        memoryStore[key] = JSON.parse(value);
      },
      removeItem: key => {
        delete memoryStore[key];
      }
    };

// -----------------------------------------------------------------------------
// Estrutura em memória
// -----------------------------------------------------------------------------
let memoriaLocal = {
  comandos: [],
  modos: [],
  eventos: [],
  ultimaAtualizacao: null
};

// -----------------------------------------------------------------------------
// Funções básicas de persistência
// -----------------------------------------------------------------------------
export function salvarMemoria() {
  memoriaLocal.ultimaAtualizacao = new Date().toISOString();
  try {
    storage.setItem(CHAVE_MEMORIA, JSON.stringify(memoriaLocal));
    console.log("[MEMÓRIA] Dados salvos.");
  } catch (e) {
    console.error("[MEMÓRIA] Erro ao salvar:", e);
  }
}

export function carregarMemoria() {
  try {
    const dados = storage.getItem(CHAVE_MEMORIA);
    if (dados) {
      memoriaLocal = JSON.parse(dados);
      console.log("[MEMÓRIA] Dados carregados.");
    } else {
      console.log("[MEMÓRIA] Nenhum dado encontrado.");
    }
  } catch (e) {
    console.error("[MEMÓRIA] Erro ao carregar:", e);
  }
}

// -----------------------------------------------------------------------------
// APIs de registro
// -----------------------------------------------------------------------------
export function registrarEvento(tipo, valor) {
  memoriaLocal.eventos.push({ tipo, valor, ts: Date.now() });
  salvarMemoria();
}

export function registrarComando(comandoTexto) {
  memoriaLocal.comandos.push({ comando: comandoTexto, ts: Date.now() });
  salvarMemoria();
  console.log(`[MEMÓRIA] Comando registrado: "${comandoTexto}"`);
}

export function registrarModo(novoModo) {
  memoriaLocal.modos.push({ modo: novoModo, ts: Date.now() });
  salvarMemoria();
  console.log(`[MEMÓRIA] Modo registrado: "${novoModo}"`);
}

// -----------------------------------------------------------------------------
// Utilidades
// -----------------------------------------------------------------------------
export function listarMemoria() {
  console.log("📚 MEMÓRIA COMPLETA ATOM:");
  console.log(JSON.stringify(memoriaLocal, null, 2));
  return memoriaLocal;
}

export function limparMemoria() {
  memoriaLocal = { comandos: [], modos: [], eventos: [], ultimaAtualizacao: null };
  storage.removeItem(CHAVE_MEMORIA);
  console.warn("[MEMÓRIA] Todos os dados foram apagados.");
}

export function registrarUsoVoz(acao = "ativar/desativar") {
  registrarEvento("voz", acao);
}

export function registrarAvatar(estado = true) {
  registrarEvento("avatar", estado ? "ativado" : "desativado");
}

export function registrarSistema(statusTexto = "inicialização") {
  registrarEvento("sistema", statusTexto);
}
