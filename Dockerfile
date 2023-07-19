FROM node:16.18.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
