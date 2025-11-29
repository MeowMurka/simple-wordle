FROM node:18-alpine
WORKDIR /app

# Копируем весь проект сразу, чтобы были и package.json, и server.js, и фронтенд
COPY . .

# Устанавливаем зависимости
RUN npm install --omit=dev

# Генерируем lastUpdate.js прямо в public, чтобы браузер мог его загрузить
RUN chmod +x build-last-update.sh && ./build-last-update.sh

# Открываем порт
EXPOSE 10000

# Запуск сервера
CMD ["node", "server.js"]
