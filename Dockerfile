FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

ARG BUILD_DATE
ENV BUILD_DATE=$BUILD_DATE

RUN npm install --omit=dev

COPY . .

EXPOSE 10000

CMD ["npm", "start"]
