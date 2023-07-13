export interface RequestDetails {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    additionalParams: Object;
}
export interface AuthTokenPayload {
    userId: number;
}