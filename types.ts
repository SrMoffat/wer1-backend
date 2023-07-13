export interface RequestDetails {
    method: string;
    url: string;
    additionalParams: Object;
}
export interface AuthTokenPayload {
    userId: number;
}