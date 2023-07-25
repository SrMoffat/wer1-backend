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
You need to install PostgreSQL on your machine and run it:
```bash 
e.g. on Mac OS:

brew install postgresql
brew services start postgresql
```

When the postgreSQL database it up and running then:
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
export MUSIC_STORY_CONSUMER_KEY=
export MUSIC_STORY_CONSUMER_SECRET=
export MUSIC_STORY_ACCESS_TOKEN=
export MUSIC_STORY_ACCESS_TOKEN_SECRET=
export APP_SECRET_KEY=this can be any random string
```
4. Add DB credentials to be used for PostgreSQL
```bash
export POSTGRES_USER="postgres"
export POSTGRES_PASSWORD="postgres"
export POSTGRES_DB="dev"

// Add server port
export PORT=4000
```
5. Export environment variables and then start the server
```bash
docker-compose up --build
```

## Queries to test
```bash
Sign Up User

mutation signupMutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
    user {
       id
       name
       email
    }
  }
}
```
```bash
Login User

mutation loginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}
```
```bash
Fetch Tracks

query fetchTracksQuery {
  fetchTracks {
    externalId
    title
    type
    length
    isrc
    creationDate
    productionDate
  }
}
```
```bash
Search Track by Title

query searchTrackQuery($title: String!) {
  searchTrackByTitle(title: $title) {
    externalId
    title
    type
    length
    isrc
    creationDate
    productionDate
  } 
}
```
```bash
Search Track by Internal ID

query searchTrackByInternalId($internalId: Int!) {
  searchTrackByInternalId(internalId: $internalId) {
    externalId
    title
    type
    length
    isrc
    creationDate
    productionDate
  } 
}
```
```bash
Update Track Details by ID

mutation updateTrackMutation($creationDate: String, $internalId: String, $isrc: String, $productionDate: String, $title: String, $type: String) {
  updateTrack(creationDate: $creationDate, internalId: $internalId, isrc: $isrc, productionDate: $productionDate, title: $title, type: $type) {
     externalId
    title
    type
    length
    isrc
    creationDate
    productionDate
    
  }
}
```
```bash
Delete Track by ID

mutation deleteTrackMutation($internalId: Int) {
  deleteTrack(internalId: $internalId) {
    externalId
    title
    type
    length
    isrc
    creationDate
    productionDate
    
  }
}
```