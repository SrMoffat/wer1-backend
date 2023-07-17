import { extendType, intArg, nonNull, stringArg } from "nexus";

import {
    fetchTracksResolver,
    updateTrackResolver,
    deleteTrackResolver,
    searchTrackByTitleResolver,
    searchTrackByInternalIdResolver
} from "./resolvers";

export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("fetchTracks", {
            type: "Track",
            resolve: fetchTracksResolver
        });
        t.nonNull.list.field("searchTrackByTitle", {
            type: "Track",
            args: {
                title: nonNull(stringArg())
            },
            resolve: searchTrackByTitleResolver
        })
        t.field("searchTrackByInternalId", {
            type: "Track",
            args: {
                internalId: nonNull(intArg())
            },
            resolve: searchTrackByInternalIdResolver
        })
    },
});
export const TrackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateTrack", {
            type: "Track",
            args: {
                type: stringArg(),
                isrc: stringArg(),
                title: stringArg(),
                length: stringArg(),
                internalId: stringArg(),
                updateDate: stringArg(),
                creationDate: stringArg(),
                productionDate: stringArg(),
            },
            resolve: updateTrackResolver
        });
        t.field("deleteTrack", {
            type: "Track",
            args: {
                internalId: intArg(),
            },
            resolve: deleteTrackResolver,
        });
    },
});
