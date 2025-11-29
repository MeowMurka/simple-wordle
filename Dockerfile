FROM node:18-alpine
WORKDIR /app

# 1. Копируем package.json для npm install (кэшируем зависимости)
COPY package*.json ./
RUN npm install --omit=dev

# 2. Копируем остальной фронтенд и сервер
COPY . .

# 3. Генерируем lastUpdate.js
RUN chmod +x build-last-update.sh && ./build-last-update.sh

EXPOSE 10000
CMD ["node", "server.js"]
