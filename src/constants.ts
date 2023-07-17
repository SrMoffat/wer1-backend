export const OATH_VERSION = '1.0';
export const SEED_MIN_ROW_COUNT = 10;
export const MUSIC_STORY_LANGUAGE = "en";
export const SEED_TRACK_TITLE_SEARCH = "Trance";
export const OATH_SIGNATURE_METHOD = 'HMAC-SHA1';
export const SEED_TRACK_UNIQUE_ID_PROPERTY = "isrc";
export const SEED_TRACK_FALLBACK_TITLE_SEARCH = "Dubstep";
export const MUSIC_STORY_BASE_URL = "https://api.music-story.com";
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || "W3R1-b4ck3nd-s3rv3r";
export const MUSIC_STORY_CONSUMER_KEY = process.env.MUSIC_STORY_CONSUMER_KEY || '';
export const MUSIC_STORY_ACCESS_TOKEN = process.env.MUSIC_STORY_ACCESS_TOKEN || '';
export const MUSIC_STORY_CONSUMER_SECRET = process.env.MUSIC_STORY_CONSUMER_SECRET || '';
export const MUSIC_STORY_ACCESS_TOKEN_SECRET = process.env.MUSIC_STORY_ACCESS_TOKEN_SECRET || '';
export const SEED_USERS = [
    {
        name: "Test User 1",
        email: "testuser1@seed.com",
        password: "testuser1p4ssw0rd",
    },
    {
        name: "Test User 2",
        email: "testuser2@seed.com",
        password: "testuser2p4ssw0rd",
    },
    {
        name: "Test User 3",
        email: "testuser3@seed.com",
        password: "testuser3p4ssw0rd",
    }
];