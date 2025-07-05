//+------------------------------------------------------------------+
//| SinalEmitter.mq5   • grava arquivos-sinal p/ ATOM (Node)         |
//| ➜ Ajuste PATH_SINAIS se sua pasta for diferente                  |
//+------------------------------------------------------------------+
#property copyright "ATOM 2025"
#property script_show_inputs
#include <Trade\Trade.mqh>

input string PATH_SINAIS =  // <─ AJUSTE para sua pasta de sinais
 "C:\\Users\\rober\\Documents\\ATOM\\PROJETO ATOM\\sinais\\";

//-------------------------------------------------------------------
// Auxiliar: grava string em arquivo
void SaveStringToFile(string fname,string data)
{
  int h=FileOpen(fname,FILE_WRITE|FILE_TXT|FILE_ANSI);
  if(h!=INVALID_HANDLE){ FileWriteString(h,data); FileClose(h); }
}

//-------------------------------------------------------------------
// Evento de negociação — capturamos ordens colocadas manualmente
void OnTradeTransaction(
   const MqlTradeTransaction &trans,
   const MqlTradeRequest      &req,
   const MqlTradeResult       &res)
{
   if(res.retcode!=10009) return;              // order placed OK
   string tipo="";
   if(req.action==TRADE_ACTION_DEAL)
   {
      if(req.type==ORDER_TYPE_BUY)        tipo="buy";
      else if(req.type==ORDER_TYPE_SELL)  tipo="sell";
   }
   if(req.action==TRADE_ACTION_REMOVE)    tipo="close";
   if(tipo=="") return;                           // não interessa

   string arq=StringFormat("%ssinal_%s_%d.json",
        PATH_SINAIS,tipo,GetTickCount());

   string json=StringFormat(
     "{ \"tipo\":\"%s\", \"parametros\":{ \"ativo\":\"%s\", \"volume\":%.2f }, \"ts\":%d }",
     tipo,Symbol(),req.volume,TimeCurrent());

   SaveStringToFile(arq,json);
   PrintFormat("📤 Arquivo-sinal salvo: %s",arq);
}

//-------------------------------------------------------------------
// Script principal: nada a fazer—fica residente aguardando eventos
void OnStart(){ Print("SinalEmitter iniciado."); }
