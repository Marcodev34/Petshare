# builder
FROM node:18 AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --unsafe-perm
COPY . .
# garantir que prisma schema exista e gerar client
RUN pnpm prisma generate
RUN pnpm run build

# produção
FROM node:18 AS production
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]
