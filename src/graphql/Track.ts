import { booleanArg, extendType, nonNull, objectType, stringArg, intArg } from "nexus";

import { fetchTracksByTitle } from "../utils";
import { NexusGenObjects } from "../../nexus-typegen";



let tracks: NexusGenObjects["Track"][] = [
    {
        externalId: "1",
        title: "I'm Only Human",
        type: "Pop",
        length: "180",
        isrc: "ISRC4535543",
        creationDate: "2015-8-10T00:00:00",
        productionDate: "2015-8-10T00:00:00",
        updateDate: "2095-8-10T00:00:00",
    },
    {
        externalId: "2",
        title: "I'm Only Alien",
        type: "Rock",
        length: "190",
        isrc: "ISRC457575543",
        creationDate: "2095-8-10T00:00:00",
        productionDate: "2095-8-10T00:00:00",
        updateDate: "2095-8-10T00:00:00",
    },
    {
        externalId: "3",
        title: "I'm Only",
        type: "Hip Hop",
        length: "210",
        isrc: "ISRC457575543",
        creationDate: "2095-8-10T00:00:00",
        productionDate: "2095-8-10T00:00:00",
        updateDate: "2095-8-10T00:00:00",
    }
];
export const Track = objectType({
    name: "Track",
    definition(t) {
        t.nonNull.string("externalId");
        t.nonNull.string("isrc");
        t.nonNull.string("title");
        t.nonNull.string("type");
        t.nonNull.string("length");
        t.nonNull.string("creationDate");
        t.nonNull.string("productionDate");
        t.nonNull.string("updateDate");
    },
});
export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("fetchTracks", {
            type: "Track",
            async resolve(parent, args, context) {
                return await context.prisma.track.findMany();
            }
        });
        t.nonNull.list.nonNull.field("searchTrack", {
            type: "Track",
            args: {
                title: nonNull(stringArg())
            },
            async resolve(parent, args, context) {
                // Look for track by title from our DB
                const existingTracks = await context.prisma.track.findMany({
                    where: {
                        title: {
                            contains: args.title
                        }
                    }
                });
                const hasInternalResults = existingTracks.length;
                if (hasInternalResults) {
                    // Return track results if any exists in our DB
                    return existingTracks;
                } else {
                    //  Otherwise search for the title in Music Story
                    const additionalParams = {
                        title: args.title
                    };
                    const musicStoryResults = await fetchTracksByTitle({
                        additionalParams
                    })
                    const hasExternalResults = musicStoryResults.length;

                    if (hasExternalResults) {
                        // Add each to DB
                        console.log("404: No track found in internal DB but in Music Story", musicStoryResults)
                        // Return results from our DB or MS depending on what we decide
                    } else {
                        console.log("404: No track found in internal DB and Music Story")
                        // Return 404
                        return []
                    }
                }
            }
        })
    },
});
export const TrackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateTrack", {
            type: "Track",
            args: {
                externalId: stringArg(),
                title: stringArg(),
                type: stringArg(),
                isrc: stringArg(),
                length: intArg(),
                productionDate: stringArg(),
                creationDate: stringArg(),
                isHit: booleanArg()
            },
            resolve(parent, args, context) {
                const remainingTracks = tracks.filter(track => track.externalId !== args.externalId);
                const candidateTrack = tracks.filter(track => track.externalId === args.externalId);
                tracks = [{
                    ...candidateTrack[0],
                    ...args,
                }, ...remainingTracks] as NexusGenObjects["Track"][]
                return {
                    ...candidateTrack[0],
                    ...args,
                }
            },
        });
        // t.nonNull.field("deleteTrack", {
        //     type: "Track",
        //     args: {
        //         externalId: stringArg(),
        //     },
        //     resolve(parent, args, context) {
        //         const remainingTracks = tracks.filter(track => track.externalId !== args.externalId);
        //         const candidateTrack = tracks.filter(track => track.externalId === args.externalId);
        //         tracks = remainingTracks as NexusGenObjects["Track"][]
        //         return candidateTrack
        //     },
        // });
    },
});
