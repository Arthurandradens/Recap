# Configuracao de API Keys

Guia passo a passo para configurar as chaves de API necessarias para rodar o PR Resume.

---

## 1. GitHub Personal Access Token

O token do GitHub permite que o PR Resume leia pull requests e commits do seu repositorio.

### Criando um Classic Token (recomendado)

1. Acesse [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Clique em **"Generate new token"** e depois em **"Generate new token (classic)"**
3. No campo **Note**, coloque um nome descritivo, por exemplo: `pr-resume`
4. Em **Expiration**, defina a validade do token (recomendado: 90 dias)
5. Na secao **Select scopes**, marque:
   - **`repo`** — acesso completo a repositorios publicos e privados
6. Clique em **"Generate token"** no final da pagina
7. Copie o token gerado (comeca com `ghp_`) e guarde em um lugar seguro — ele nao sera exibido novamente

> **Dica:** Recomendamos o uso de **Classic Token** por ser mais simples de configurar. Tokens fine-grained oferecem controle mais granular, mas exigem configuracao adicional por repositorio.

### Alternativa: Fine-grained Token

Se preferir mais seguranca, voce pode usar [fine-grained personal access tokens](https://github.com/settings/personal-access-tokens/new):

1. Em **Resource owner**, selecione sua organizacao ou conta pessoal
2. Em **Repository access**, selecione **Only select repositories** e escolha o repositorio desejado
3. Em **Permissions > Repository permissions**, configure:
   - **Contents**: Read-only
   - **Pull requests**: Read-only
   - **Metadata**: Read-only (selecionado automaticamente)
4. Clique em **Generate token**

---

## 2. OpenAI API Key

A chave da OpenAI e usada para gerar resumos com IA usando o modelo GPT-4o-mini (ja configurado por padrao).

### Passo a passo

1. Acesse [OpenAI Platform > API Keys](https://platform.openai.com/api-keys)
2. Faca login ou crie uma conta
3. Clique em **"Create new secret key"**
4. De um nome para a chave, por exemplo: `pr-resume`
5. Copie a chave gerada (comeca com `sk-`) e guarde em um lugar seguro

### Adicionando creditos

Para usar a API, voce precisa ter creditos na sua conta:

1. Acesse [OpenAI Billing](https://platform.openai.com/account/billing)
2. Adicione um metodo de pagamento (cartao de credito)
3. Adicione creditos a sua conta (o minimo geralmente e $5)

> **Custo estimado:** O PR Resume usa o modelo **GPT-4o-mini**, que e muito acessivel. Um resumo diario tipico custa **menos de $0.01**.

---

## 3. Variaveis de Ambiente

### Copiando o arquivo de exemplo

```bash
cp .env.example .env.local
```

### Preenchendo os valores

Abra o arquivo `.env.local` e preencha com suas chaves:

```env
# Token do GitHub (criado no passo 1)
GITHUB_TOKEN=ghp_seu_token_aqui

# Dono do repositorio (usuario ou organizacao)
# Exemplo: para https://github.com/acme/my-app, use "acme"
GITHUB_OWNER=seu-usuario-ou-org

# Nome do repositorio
# Exemplo: para https://github.com/acme/my-app, use "my-app"
GITHUB_REPO=nome-do-repositorio

# Chave da OpenAI (criada no passo 2)
OPENAI_API_KEY=sk-sua_chave_aqui
```

### Explicacao de cada variavel

| Variavel | Obrigatoria | Descricao |
|----------|:-----------:|-----------|
| `GITHUB_TOKEN` | Sim | Token de acesso pessoal do GitHub com escopo `repo` |
| `GITHUB_OWNER` | Sim | Dono do repositorio (usuario ou organizacao no GitHub) |
| `GITHUB_REPO` | Sim | Nome do repositorio que sera monitorado |
| `OPENAI_API_KEY` | Sim | Chave de API da OpenAI para gerar resumos com IA |

---

## 4. Verificando a configuracao

Inicie a aplicacao e verifique se tudo esta funcionando:

```bash
npm run dev
# Abra http://localhost:3000
```

---

## Solucao de problemas

| Erro | Solucao |
|------|---------|
| `GITHUB_AUTH_ERROR` | Verifique se o token tem os escopos corretos e nao expirou |
| `OPENAI_ERROR` | Verifique se a chave da API e valida e se voce tem creditos |
| `MISSING_CONFIG` | Certifique-se de que todas as variaveis de ambiente estao configuradas no `.env.local` |
| `RATE_LIMITED` | Limite da API do GitHub atingido — aguarde alguns minutos e tente novamente |
