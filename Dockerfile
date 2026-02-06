# Fase 1: Construcción
FROM node:20-slim AS builder
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# Fase 2: Ejecución
FROM node:20-slim AS runner
WORKDIR /app

# Copiamos solo los archivos necesarios de la fase anterior
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno por defecto
ENV NODE_ENV=production
EXPOSE 3000

# Comando para arrancar la app de SvelteKit
CMD ["node", "build"]