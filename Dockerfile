FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

COPY next.config.js ./next.config.js

CMD ["npm", "run", "dev"]