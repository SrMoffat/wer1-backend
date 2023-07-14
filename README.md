# wer1-backend
WeR1 backend

## Technology Spec
- [x] Apollo Server (Only backend no client required)
- [x] Use [Music Story API](https://developers.music-story.com/developers)


## Implementation Spec
- [x] Implement base schema with `internalId`, `createdAt`, and `updatedAt`
- [x] Extend base schema for `Track` to include:
    - `id`: Identifier from the API
    - `title`: Name of the track
    - `length`: Duration of the track in seconds
    - `ISRC`: Internation Standard Recording Code
    - `productionDate`: Date track was produced
    - `creationDate`: Date track was created in external API
    - `type`: Genre of track
    - `isHit`: If the track is a hit
- [x] When searching for a track by name, if it doesn't exist in DB, fetch it from API and insert into DB then return results
- [] Include error handling and HTTP status codes for the GraphQL API
- [] Use TypeScript for type safety and type definitions for the application
- [] Write at least two tests for any of the features
- [] Dockerfile or docker-compose file is a plus, otherwise provide comprehensive setup documentation
- [x] Serve everything from a single endpoint `/graphql`

## Feature Spec
- [x] Allow users to  sign up for an account
- [x] Allow users to  login to their account
- [x] Allow users to fetch all available tracks
- [x] Allow users to fetch track by `name`
- [x] Allow users to fetch track by `internalId`
- [x] Allow users to create new track if they don't already exist
- [x] Allow users to update a track by `internalId`
- [x] Allow users to delete a track by `internalId`

## Stretch Features
- [] Allow users to bulk update tracks
- [] Allow users to bulk delete tracks


