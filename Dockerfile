# Usa la imagen base oficial de Node.js versión 20.16
FROM node:20.16

# Crea un directorio de trabajo
WORKDIR /app

# Copia solo los archivos package.json, pnpm-lock.yaml y index.js
COPY package.json pnpm-lock.yaml index.js ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# Instala las dependencias usando pnpm
RUN pnpm install

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["pnpm", "start"]
