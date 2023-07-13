// https://developers.music-story.com/developers/track#c_search
import { RequestDetails } from "../../types";
import querystring from "querystring";
import axios from "axios";
import { parseStringPromise } from "xml2js";



import { generateOAuthParams, generateSignature, encodeValue, accessToken } from "./auth";

export async function fetchTracksByTitle(details: RequestDetails) {
    try {
        const {
            url,
            method,
            additionalParams = {}
        } = details;
        const oauthParams = {
            ...generateOAuthParams(),
            ...additionalParams
        };
        const orderedParams = Object.keys(oauthParams).sort();
        const paramsString = querystring.stringify(orderedParams.reduce((acc, key) => {
            // @ts-ignore
            acc[key] = oauthParams[key];
            return acc;
        }, {}));
        const signature = generateSignature(method, url, paramsString);
        const response = await axios.request({
            method,
            url: `${url}?${paramsString}&oauth_signature=${encodeValue(signature)}`,
        });
        const data = await response.data
        const jsonData = await parseStringPromise(data);
        const trackDetails = extractTrackDetails(jsonData)
        console.log("response==>", response);

        // return response.data;
    } catch (error) {
        throw error;
    }
}
