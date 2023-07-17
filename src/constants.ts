export const OATH_VERSION = "1.0";
export const SEED_MIN_ROW_COUNT = 10;
export const MUSIC_STORY_LANGUAGE = "en";
export const SEED_TRACK_TITLE_SEARCH = "Trance";
export const OATH_SIGNATURE_METHOD = "HMAC-SHA1";
export const SEED_TRACK_UNIQUE_ID_PROPERTY = "isrc";
export const INVALID_AUTH_ERROR = "Invalid credentials";
export const SEED_TRACK_FALLBACK_TITLE_SEARCH = "Dubstep";
export const MUSIC_STORY_BASE_URL = "https://api.music-story.com";
export const SERVER_ERROR = "Something went wrong. Our team is working on it.";
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || "W3R1-b4ck3nd-s3rv3r";
export const MUSIC_STORY_CONSUMER_KEY = process.env.MUSIC_STORY_CONSUMER_KEY || "";
export const MUSIC_STORY_ACCESS_TOKEN = process.env.MUSIC_STORY_ACCESS_TOKEN || "";
export const REQUIRED_FIELD_MESSAGE = (field: string) => `${field} is a required field`;
export const MUSIC_STORY_CONSUMER_SECRET = process.env.MUSIC_STORY_CONSUMER_SECRET || "";
export const MUSIC_STORY_ACCESS_TOKEN_SECRET = process.env.MUSIC_STORY_ACCESS_TOKEN_SECRET || "";
export const NONCE_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const AUTH_VALIDATION_ERRORS = {
    name: {
        required: REQUIRED_FIELD_MESSAGE("Name"),
        invalid: "Name must be more than 2 characters."
    },
    email: {
        required: REQUIRED_FIELD_MESSAGE("Email"),
        invalid: "Invalid email provided."
    },
    password: {
        required: REQUIRED_FIELD_MESSAGE("Password"),
        invalid: "Password have 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    }
};
export const GRAPHQL_TO_HTTP_ERROR_CODES = {
    BAD_USER_INPUT: {
        statusCode: 400,
    },
    GRAPHQL_PARSE_FAILED: {
        statusCode: 422,
    },
    BAD_REQUEST: {
        statusCode: 400,
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
    }
};
export const SEED_USERS = [
    {
        name: "Test User 1",
        email: "testuser1@seed.com",
        password: "12345678Qq!",
    },
    {
        name: "Test User 2",
        email: "testuser2@seed.com",
        password: "12345678Qq!",
    },
    {
        name: "Test User 3",
        email: "testuser3@seed.com",
        password: "12345678Qq!",
    }
];