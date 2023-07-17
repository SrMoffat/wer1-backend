// https://developers.music-story.com/developers/track#c_search
import axios from "axios";
import querystring from "querystring";

import { pick, get } from "lodash";
import { parseStringPromise } from "xml2js";

import { NexusGenObjects } from "../../nexus-typegen";
import { RequestDetails, XMLProperties } from "../../types";
import { generateOAuthParams, generateSignature, encodeValue } from "./auth";
import { MUSIC_STORY_BASE_URL, MUSIC_STORY_LANGUAGE, SELECT_KEYS_FROM_MUSIC_STORY } from "../constants";

const firstIndex = "[0]";

function extractTrackDetails(details: XMLProperties) {
    const response = details.root;
    const hasResults = get(response.data, firstIndex)
    if (hasResults) {
        const data = response.data[0].item;
        const massaged = data.map(entry => pick(entry, SELECT_KEYS_FROM_MUSIC_STORY));
        const morphed = massaged.map(entry => ({
            type: "track",
            isrc: String(get(entry?.isrc, firstIndex)),
            title: String(get(entry?.title, firstIndex)),
            externalId: String(get(entry?.id, firstIndex)),
            length: String(get(entry?.length, firstIndex)),
            updateDate: String(get(entry?.update_date, firstIndex)),
            creationDate: String(get(entry?.creation_date, firstIndex)),
            productionDate: String(get(entry?.production_date, firstIndex)),
        }));
        return morphed;
    }
    return []
};
export async function fetchTracksByTitle(details: RequestDetails): Promise<NexusGenObjects["Track"][]> {
    try {
        const method = "GET";
        const url = `${MUSIC_STORY_BASE_URL}/${MUSIC_STORY_LANGUAGE}/track/search`
        const { additionalParams } = details;
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
        const data = response.data;
        const jsonData = await parseStringPromise(data);
        const trackDetails = extractTrackDetails(jsonData);
        return trackDetails;
    } catch (error) {
        throw error;
    };
};
