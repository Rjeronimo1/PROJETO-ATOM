@echo off
echo Criando tarefa agendada para sincronização automática do ATOM a cada 1 hora...

schtasks /Create ^
 /TN "Sincronizar_ATOM_Hora" ^
 /TR "powershell -ExecutionPolicy Bypass -File \"C:\Users\rober\Documents\ATOM\PROJETO ATOM\sincronizarATOM.ps1\"" ^
 /SC HOURLY ^
 /F

echo.
echo ✅ Tarefa agendada criada com sucesso para execução a cada 1 hora!
pause
