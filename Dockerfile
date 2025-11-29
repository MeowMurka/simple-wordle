FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY build-last-update.sh .
RUN chmod +x build-last-update.sh && ./build-last-update.sh

RUN npm install --omit=dev

COPY . .

EXPOSE 10000

CMD ["npm", "start"]
