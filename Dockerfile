FROM node:18-alpine
WORKDIR /app

# Копируем весь проект сначала
COPY . .

# Генерируем lastUpdate.js
COPY build-last-update.sh .
RUN chmod +x build-last-update.sh && ./build-last-update.sh

RUN npm install --omit=dev

EXPOSE 10000
CMD ["npm", "start"]
