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
2. Create environment variables file using template
```bash
cat .env.example >> .env
```
3. Create a [Music Story Account](https://developers.music-story.com/developers) and set the following environment variables in `.env`:
```bash
MUSIC_STORY_CONSUMER_KEY=
MUSIC_STORY_CONSUMER_SECRET=
MUSIC_STORY_ACCESS_TOKEN=
MUSIC_STORY_ACCESS_TOKEN_SECRET=
APP_SECRET_KEY=this can be any random string
```
4. Add DB credentials to be used by docker for PostgreSQL
```bash
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="dev"
```
5. Start server
```bash
docker-compose up --build
```