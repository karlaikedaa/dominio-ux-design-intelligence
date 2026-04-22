# 🔒 Configuração de Segurança

## Proteção por senha

O site está protegido por uma camada de autenticação. Para configurar a senha:

### 1. Definir a senha na Vercel

1. Acesse o dashboard: https://vercel.com/karlas-projects-32ebd77a/dominio-ux-design-intelligence
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Name**: `VITE_ACCESS_PASSWORD`
   - **Value**: `sua-senha-secreta`
   - **Environment**: Production, Preview, Development (marque todos)
4. Clique em **Save**
5. Vá em **Deployments** e clique em **Redeploy** no último deployment

### 2. Senha padrão atual

Se não configurar a variável de ambiente, a senha padrão é: `dominio2024`

**⚠️ IMPORTANTE:** Altere esta senha para uma senha forte assim que possível!

### 3. Testar localmente

```bash
# Crie o arquivo .env.local (já existe)
echo "VITE_ACCESS_PASSWORD=sua-senha-local" > .env.local

# Execute o servidor de desenvolvimento
npm run dev
```

### 4. Como funciona

- A senha é verificada no lado do cliente (navegador)
- Quando correta, salva um token no localStorage do navegador
- O usuário permanece logado até limpar o cache/localStorage
- Para forçar logout: `localStorage.removeItem('dominio-ux-auth')`

### 5. Compartilhar acesso

Para dar acesso a alguém:
1. Envie o link: https://dominio-ux-design-intelligence.vercel.app
2. Compartilhe a senha configurada no passo 1

## Opções mais avançadas (futuro)

### Vercel Password Protection (requer plano Pro)
- Dashboard → Settings → Deployment Protection
- Proteção nativa da Vercel
- Mais segura que implementação custom

### Vercel Authentication
- Integração com Google, GitHub, etc
- Requer configuração de OAuth

### IP Allowlist (Enterprise)
- Restringir por endereço IP
- Ideal para ambientes corporativos
