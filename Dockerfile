# Builder stage
FROM node:20 AS builder
RUN npm install -g pnpm prisma
WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copiar o resto dos arquivos (excluindo node_modules)
COPY . .
# Garantir que prisma schema exista e gerar client
RUN pnpm prisma generate
RUN pnpm run build

# Production stage
FROM node:20 AS production
RUN npm install -g pnpm prisma
WORKDIR /app

# Copiar package.json e pnpm-lock.yaml
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Copiar build da aplicação
COPY --from=builder /app/dist ./dist

# Copiar schema do Prisma
COPY --from=builder /app/prisma ./prisma

# Gerar cliente Prisma para produção
RUN prisma generate

EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]