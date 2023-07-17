import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
export interface RequestDetails {
    url?: string;
    additionalParams: Object;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};
export interface AuthTokenPayload {
    userId: number;
};
export interface MSTrack {
    id: string[];
    isrc: string[];
    title: string[];
    length: string[];
    id_work: string[];
    subtitle: string[];
    id_record: string[];
    id_release: string[];
    disc_number: string[];
    update_date: string[];
    track_number: string[];
    creation_date: string[];
    search_scores: string[];
    recording_place: string[];
    production_date: string[];
    parental_advisory: string[];
};
export interface MusicStoryTrack {
    item: MSTrack[];

};
export interface XMLProperties {
    root: {
        code: string[];
        count: string[];
        version: string[];
        pageCount: string[];
        currentPage: string[];
        data: MusicStoryTrack[];
    }
};

export interface AppContext {
    userId?: number;
    prisma: PrismaClient;
};
export type TestContext = {
    client: ApolloServer;
};
