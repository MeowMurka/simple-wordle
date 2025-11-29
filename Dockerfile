FROM node:18-alpine
WORKDIR /app

# Копируем package.json для npm install
COPY package*.json ./
RUN npm install --omit=dev

# Копируем фронтенд в public
COPY public ./public

# Генерируем lastUpdate.js в public
COPY build-last-update.sh .
RUN chmod +x build-last-update.sh && ./build-last-update.sh

EXPOSE 10000
CMD ["node", "server.js"]
