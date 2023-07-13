// https://developers.music-story.com/developers
import * as jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import querystring from "querystring";

import { RequestDetails, AuthTokenPayload } from "../../types";

const APP_SECRET_KEY = process.env.APP_SECRET_KEY || "W3R1-b4ck3nd-s3rv3r";

const consumerKey = process.env.MUSIC_STORY_CONSUMER_KEY || '';
const consumerSecret = process.env.MUSIC_STORY_CONSUMER_SECRET || '';
const accessToken = process.env.MUSIC_STORY_ACCESS_TOKEN || '';
const accessTokenSecret = process.env.MUSIC_STORY_ACCESS_TOKEN_SECRET || '';

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
