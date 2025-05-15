# Aplicação de Autenticação

Esta é uma aplicação de autenticação simples construída com TypeScript, Express e MySQL.

## Pré-requisitos

- Node.js
- MySQL
- npm ou yarn
- Docker e Docker Compose (opcional)

## Instalação e Execução

### Método 1: Instalação Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados MySQL chamado `login_app`
- Execute o seguinte SQL para criar a tabela de usuários:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

4. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=login_app
PORT=3000
```

5. Execute a aplicação:
```bash
# Para desenvolvimento
npm run dev

# Para produção
npm run build
npm start
```

### Método 2: Usando Docker

1. Certifique-se de ter o Docker e Docker Compose instalados

2. Na raiz do projeto, execute:
```bash
# Construir e iniciar os containers
docker-compose up --build

# Para executar em background
docker-compose up -d

# Para parar os containers
docker-compose down
```

3. A aplicação estará disponível em `http://localhost:3000`

## Endpoints da API

### Registro de usuário
```bash
POST /auth/register
Content-Type: application/json

{
    "username": "novo_usuario",
    "password": "senha123"
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
    "username": "novo_usuario",
    "password": "senha123"
}
```

## Estrutura do Projeto

```
.
├── src/
│   ├── controllers/
│   │   └── authController.ts
│   ├── routes/
│   │   └── authRoutes.ts
│   ├── app.ts
│   └── db.ts
├── Dockerfile
├── docker-compose.yml
├── init.sql
├── package.json
└── tsconfig.json
```

## Notas sobre o Docker

- O banco de dados MySQL é configurado automaticamente com:
  - Usuário: root
  - Senha: root
  - Banco de dados: login_app
  - Porta: 3306

- Os dados do MySQL são persistidos em um volume Docker
- A aplicação Node.js roda na porta 3000
- O arquivo `init.sql` é executado automaticamente na primeira inicialização do container do MySQL 