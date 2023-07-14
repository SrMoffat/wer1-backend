export interface RequestDetails {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    additionalParams: Object;
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
        version: string[];
        code: string[];
        count: string[];
        pageCount: string[];
        currentPage: string[];
        data: MusicStoryTrack[];
    }
};
