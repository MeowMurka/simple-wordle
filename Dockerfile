FROM node:18-alpine

WORKDIR /app

# Копируем package.json (если нужен npm install)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем скрипт генерации даты и запускаем
COPY build-last-update.sh .
RUN chmod +x build-last-update.sh && ./build-last-update.sh

# Копируем весь фронтенд + server.js
COPY . .

EXPOSE 10000

CMD ["npm", "start"]
