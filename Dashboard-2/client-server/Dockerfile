FROM node:17-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env .

RUN npm install

COPY . .

EXPOSE 8080

CMD [  "npm", "run", "start:migrate:dev" ]