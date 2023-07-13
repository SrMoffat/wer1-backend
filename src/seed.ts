import { makeOAuthRequest } from "./utils/auth";

const MUSIC_STORY_BASE_URL = "https://api.music-story.com";

const consumerKey = "328b36e8f8da29da381990f593d965347b1763a5";
const consumerSecret = "83a02eb8b095df5f75f944a0f55de36aff0c3424";

const accessToken = "caa3544ce84a374a1ed744542524aac75c783966";
const accessTokenSecret = "9eaecbf5ef7e6c9ab19c3cd237127558347bb2ab";
const apiUrl = `${MUSIC_STORY_BASE_URL}/oauth/request_token`;
const method = 'GET';
const additionalParams = {}; // Additional parameters for the request, if any

(async () => {
    try {
        const requestDetails = {
            method,
            url: apiUrl,
            consumerKey,
            consumerSecret,
            accessToken,
            accessTokenSecret,
            additionalParams
        }
        const res = await makeOAuthRequest(requestDetails)
        console.log("Data==>", res);
    } catch (error) {
        console.error("Erroor==>", error);
    }
})();