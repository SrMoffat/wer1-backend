import * as jwt from "jsonwebtoken";

export const APP_SECRET_KEY = "W3R1-b4ck3nd-s3rv3r";

export interface AuthTokenPayload {
    userId: number;
}

export function decodeAuthheader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");
    if(!token){
        throw new Error("Invalid credentials");
    }
    return jwt.verify(token, APP_SECRET_KEY) as AuthTokenPayload
};
