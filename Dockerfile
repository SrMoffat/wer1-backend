FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
