// https://developers.music-story.com/developers
import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import querystring from "querystring";
import axios, { AxiosError } from "axios";

export const MUSIC_STORY_BASE_URL = "https://api.music-story.com";
export const APP_SECRET_KEY = "W3R1-b4ck3nd-s3rv3r";
export const consumerKey = "328b36e8f8da29da381990f593d965347b1763a5";
export const consumerSecret = "83a02eb8b095df5f75f944a0f55de36aff0c3424";
export const accessToken = "1ecd74a83ce347fe9803a5885426fac2fa4df6a5";
export const accessTokenSecret = "4b5025ada4e6f4ecc6b0c1510a69b31a8d7f3a99";
export const apiUrl = `${MUSIC_STORY_BASE_URL}/oauth/request_token`;
const method = 'GET';
const additionalParams = {}; // Additional parameters for the request, if any

interface RequestDetails {
    method: string;
    url: string;
    consumerKey: string;
    consumerSecret: string;
    accessToken: string;
    accessTokenSecret: string;
    additionalParams: Object;


}

export interface AuthTokenPayload {
    userId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        throw new Error("Invalid credentials");
    }
    return jwt.verify(token, APP_SECRET_KEY) as AuthTokenPayload
};

export function generateNonce(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < length; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
}

export function encodeValue(value: string | number | boolean) {
    return encodeURIComponent(value).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

export function generateSignature(method: string, url: string, params: string, consumerSecret: string, tokenSecret = '') {
    const baseString = `${method.toUpperCase()}&${encodeValue(url)}&${encodeValue(params)}`;
    const signingKey = `${encodeValue(consumerSecret)}&${encodeValue(tokenSecret)}`;
    return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
}

export async function makeOAuthRequest(details: RequestDetails) {
    try {
        const {
            url,
            method,
            accessToken,
            consumerKey,
            consumerSecret,
            accessTokenSecret,
            additionalParams = {}
        } = details;
        const oauthParams = {
            oauth_consumer_key: consumerKey,
            oauth_token: accessToken,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
            oauth_nonce: generateNonce(),
            oauth_version: '1.0',
            ...additionalParams
        };
        const orderedParams = Object.keys(oauthParams).sort();
        const paramsString = querystring.stringify(orderedParams.reduce((acc, key) => {
            // @ts-ignore
            acc[key] = oauthParams[key];
            return acc;
        }, {}));
        const signature = generateSignature(method, url, paramsString, consumerSecret, accessTokenSecret);
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
}

