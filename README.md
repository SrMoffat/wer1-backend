# wer1-backend
WeR1 backend

## Technology Spec
- [] Apollo Server (Only backend no client required)
- [] Use [Music Story API](https://developers.music-story.com/developers)


## Implementation Spec
- [] Implement base schema with `internalId`, `createdAt`, and `updatedAt`
- [] Extend base schema for `Track` to include:
    - `id`: Identifier from the API
    - `title`: Name of the track
    - `length`: Duration of the track in seconds
    - `ISRC`: Internation Standard Recording Code
    - `productionDate`: Date track was produced
    - `type`: Genre of track
    - `isHit`: If the track is a hit
- [] When searching for a track by name, if it doesn't exist in DB, fetch it from API and insert into DB then return results
- [] Include error handling and HTTP status codes for the GraphQL API
- [] Use TypeScript for type safety and type definitions for the application
- [] Write at least two tests for any of the features
- [] Dockerfile or docker-compose file is a plus, otherwise provide comprehensive setup documentation
- [] Serve everything from a single endpoint `/graphql`

## Feature Spec
- [] Allow users to  sign up for an account
- [] Allow users to  login to their account
- [] Allow users to fetch all available tracks
- [] Allow users to fetch track by `name`
- [] Allow users to fetch track by `internalId`
- [] Allow users to create new track if they don't already exist
- [] Allow users to update a track by `internalId`
- [] Allow users to delete a track by `internalId`

## Stretch Features
- [] Allow users to bulk update tracks
- [] Allow users to bulk delete tracks


