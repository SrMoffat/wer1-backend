FROM node:16.18.1

WORKDIR /app


COPY package*.json ./
# COPY tsconfig.json ./
COPY prisma ./prisma/

# RUN npm install -g ts-node typescript
RUN npm install

COPY . .

RUN npm run build
RUN npm run db:seed

EXPOSE 4000

# CMD ["npm", "run", "prisma:migate:dev", "&&", "npm", "run", "start"]
CMD ["npm", "start"]
