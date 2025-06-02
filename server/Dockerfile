FROM node:18-alpine
WORKDIR /interview-shop
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}
CMD ["npm", "start"]