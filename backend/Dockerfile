FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@11.1.0

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]