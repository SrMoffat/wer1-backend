# WeR1 Backend
Apollo Server wrapper for [Music Story API](https://developers.music-story.com/developers)

## Local Setup (with Docker)
1. [Install Docker](https://docs.docker.com/engine/install/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Clone the repository and change into it
```bash
git clone git@github.com:SrMoffat/wer1-backend.git
cd wer1-backend
```
4. Start the database and the app
```bash
docker-compose up --build
```
6. Open app
```bash
http://localhost:4000/graphql
```


## Local Setup (without Docker)
1. Clone the repository and change into it
```bash
git clone git@github.com:SrMoffat/wer1-backend.git
cd wer1-backend
```
2. Setup PostgreSQL
3. Setup Prisma
4. Seed database
