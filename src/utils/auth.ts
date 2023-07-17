// https://developers.music-story.com/developers
import * as jwt from "jsonwebtoken";

import axios from "axios";
import crypto from "crypto";
import querystring from "querystring";

import { RequestDetails, AuthTokenPayload } from "../../types";
import {
    OATH_VERSION,
    APP_SECRET_KEY,
    OATH_SIGNATURE_METHOD,
    MUSIC_STORY_CONSUMER_KEY,
    MUSIC_STORY_ACCESS_TOKEN,
    MUSIC_STORY_CONSUMER_SECRET,
    MUSIC_STORY_ACCESS_TOKEN_SECRET
} from "../constants";

export function generateOAuthParams() {
    const oauthParams = {
        oauth_consumer_key: MUSIC_STORY_CONSUMER_KEY,
        oauth_token: MUSIC_STORY_ACCESS_TOKEN,
        oauth_signature_method: OATH_SIGNATURE_METHOD,
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_nonce: generateNonce(),
        oauth_version: OATH_VERSION,
    };
    return oauthParams;
};
export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        throw new Error("Invalid credentials");
    }
    return jwt.verify(token, APP_SECRET_KEY) as AuthTokenPayload;
};
export function generateNonce(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < length; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
};
export function encodeValue(value: string | number | boolean) {
    return encodeURIComponent(value).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
};
export function generateSignature(method: string, url: string, params: string) {
    const baseString = `${method.toUpperCase()}&${encodeValue(url)}&${encodeValue(params)}`;
    const signingKey = `${encodeValue(MUSIC_STORY_CONSUMER_SECRET)}&${encodeValue(MUSIC_STORY_ACCESS_TOKEN_SECRET)}`;
    return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
};
export async function makeOAuthRequest(details: RequestDetails) {
    try {
        const url = ``;
        const method = "GET";
        const {
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
        // @ts-ignore
        const authHeader = `OAuth ${orderedParams.map(key => `${encodeValue(key)}="${encodeValue(oauthParams[key])}"`).join(', ')}, oauth_signature="${encodeValue(signature)}"`;
        const headers = {
            Authorization: authHeader,
            'Content-Type': 'application/json'
        };
        const response = await axios.request({
            method,
            url,
            headers
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
