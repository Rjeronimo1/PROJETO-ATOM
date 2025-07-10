
// motorTatico.js - Gerado automaticamente por Sheldon
export default class MotorTatico {
  constructor() {
    this.estado = "ativo";
  }

  executarEntrada(estrutura, contexto) {
    if (estrutura === "BOS" && contexto === "liquidez") {
      return "EXECUTAR_COMPRA";
    }
    return "AGUARDAR_CONFIRMACAO";
  }
}
