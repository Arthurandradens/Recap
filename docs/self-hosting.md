# Self-Hosting

Guia para rodar o PR Resume na sua propria infraestrutura.

---

## Requisitos

- [Node.js](https://nodejs.org/) 18+
- npm

Para instalacao com Docker:
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

---

## Instalacao com Node.js

```bash
# Clone o repositorio
git clone https://github.com/your-username/pullrequest-resume.git
cd pullrequest-resume

# Instale as dependencias
npm install

# Copie o arquivo de exemplo e configure suas chaves
cp .env.example .env.local
# Edite .env.local com suas API keys (veja docs/setup.md)

# Build da aplicacao
npm run build

# Inicie o servidor
npm start

# Acesse http://localhost:3000
```

---

## Instalacao com Docker

```bash
# Clone o repositorio
git clone https://github.com/your-username/pullrequest-resume.git
cd pullrequest-resume

# Copie o arquivo de exemplo e configure suas chaves
cp .env.example .env
# Edite .env com suas API keys (veja docs/setup.md)

# Inicie com Docker Compose
docker-compose up -d

# Acesse http://localhost:3000
```

Para verificar se o container esta rodando:

```bash
docker ps
```

Para ver os logs:

```bash
docker-compose logs -f
```

---

## Atualizacao

### Com Node.js

```bash
# Baixe as ultimas alteracoes
git pull

# Reinstale dependencias (caso tenham mudado)
npm install

# Rebuild da aplicacao
npm run build

# Reinicie o servidor
npm start
```

### Com Docker

```bash
git pull
docker-compose up -d --build
```

---

## Notas

- O banco de dados SQLite e armazenado no diretorio `data/`. Faca backup desse diretorio se necessario.
- Para fazer backup com Docker:
  ```bash
  docker cp pr-resume:/app/data/summaries.db ./backup-summaries.db
  ```
- A aplicacao roda na porta **3000** por padrao.
- Em producao, considere usar um reverse proxy (como Nginx) na frente da aplicacao.
