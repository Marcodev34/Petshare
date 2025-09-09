# Etapa 1: build
FROM node:18 AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
RUN pnpm install --frozen-lockfile --config.ignore-scripts=false


# Copiar o resto do código
COPY . .

# Gerar build do NestJS (gera pasta dist/)
RUN pnpm run build



# Etapa 2: imagem final (produção)
FROM node:18 AS production

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar apenas os arquivos necessários da etapa anterior
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Porta exposta pela API
EXPOSE 3000

# Rodar em produção
CMD ["pnpm", "run", "start:prod"]
