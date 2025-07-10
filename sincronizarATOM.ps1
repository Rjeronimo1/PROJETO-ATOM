# Caminho até à pasta local do projeto
$projeto = "C:\Users\rober\Documents\ATOM\PROJETO ATOM"

# Mensagem de commit automática com timestamp
$data = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$mensagem = "Sheldon: sincronização automática do ATOM em $data"

# Ir até à pasta
Set-Location $projeto

# Adicionar alterações ao staging
git add .

# Fazer commit automático
git commit -m "$mensagem"

# Enviar para o GitHub
git push origin main

# Log para debug local (opcional)
"$data | Commit automático executado com sucesso" | Out-File -Append "$projeto\log_sheldon.txt"

# Para debug manual
Read-Host "Pressione Enter para fechar"
