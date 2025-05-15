FROM node:18-alpine

WORKDIR /app

# Instalar dependências globais
RUN npm install -g typescript ts-node

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY src/ ./src/

EXPOSE 3000

# Usar ts-node para executar diretamente
CMD ["ts-node", "src/app.ts"] 