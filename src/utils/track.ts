// https://developers.music-story.com/developers/track#c_search
import axios from "axios";
import querystring from "querystring";

import { pick, get } from "lodash";
import { parseStringPromise } from "xml2js";

import { NexusGenObjects } from "../../nexus-typegen";
import { RequestDetails, XMLProperties } from "../../types";
import { generateOAuthParams, generateSignature, encodeValue } from "./auth";
import { MUSIC_STORY_BASE_URL, MUSIC_STORY_LANGUAGE, SELECT_KEYS_FROM_MUSIC_STORY } from "../constants";

function extractTrackDetails(details: XMLProperties) {
    const response = details.root;
    const hasResults = get(response.data, "[0]")
    if (hasResults) {
        const data = response.data[0].item;
        const massaged = data.map(entry => pick(entry, SELECT_KEYS_FROM_MUSIC_STORY));
        const morphed = massaged.map(entry => ({
            type: "track",
            isrc: String(get(entry?.isrc, "[0]")),
            title: String(get(entry?.title, "[0]")),
            externalId: String(get(entry?.id, "[0]")),
            length: String(get(entry?.length, "[0]")),
            updateDate: String(get(entry?.update_date, "[0]")),
            creationDate: String(get(entry?.creation_date, "[0]")),
            productionDate: String(get(entry?.production_date, "[0]")),
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
