# 🚀 Back-end

API REST construída com **Express** + **TypeScript** + **MySQL**.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)

## Como rodar

### Pré-requisitos
- Node.js 18+
- MySQL rodando localmente ou em nuvem

### Instalação

```bash
# Clone o repositório
git clone https://github.com/NanaAlex/back.git
cd back

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com seus dados do banco

# Rode em desenvolvimento
npm run dev
```

### Build para produção

```bash
npm run build
npm start
```

## Estrutura de pastas

```
src/
├── database/
│   └── connection.ts   # Conexão com o MySQL
└── server.ts           # Entry point da aplicação
```

## Variáveis de ambiente

| Variável  | Descrição              | Padrão    |
|-----------|------------------------|-----------|
| PORT      | Porta do servidor      | 3333      |
| DB_HOST   | Host do banco de dados | localhost |
| DB_USER   | Usuário do banco       | root      |
| DB_PASS   | Senha do banco         |           |
| DB_NAME   | Nome do banco          | mydb      |
