FROM node:16.18.1

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run generate
RUN npm run build
RUN npm run db:seed

EXPOSE 4000

CMD ["npm", "start"]
