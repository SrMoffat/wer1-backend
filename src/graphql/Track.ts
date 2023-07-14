import { uniqBy } from "lodash";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

import { fetchTracksByTitle } from "../utils";

export const Track = objectType({
    name: "Track",
    definition(t) {
        t.nonNull.string("isrc");
        t.nonNull.string("type");
        t.nonNull.string("title");
        t.nonNull.string("length");
        t.nonNull.string("updateDate");
        t.nonNull.string("externalId");
        t.nonNull.string("creationDate");
        t.nonNull.string("productionDate");
    },
});
export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("fetchTracks", {
            type: "Track",
            async resolve(parent, args, context) {
                try {
                    return await context.prisma.track.findMany();
                } catch (error) {
                    throw error;
                }
            }
        });
        t.nonNull.list.field("searchTrackByTitle", {
            type: "Track",
            args: {
                title: nonNull(stringArg())
            },
            async resolve(parent, args, context) {
                try {
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
                            const dedupedResults = uniqBy(musicStoryResults, "isrc")
                            for (const track of dedupedResults) {
                                await context.prisma.track.create({
                                    data: {
                                        ...track
                                    },
                                })
                            }
                            // Return results from Music Story after insert to DB
                            return dedupedResults
                        } else {
                            // Return 404 no results from Music Story and our DB
                            return []
                        }
                    }
                } catch (error) {
                    throw error;
                }
            }
        })
        t.field("searchTrackByInternalId", {
            type: "Track",
            args: {
                internalId: nonNull(intArg())
            },
            async resolve(parent, args, context) {
                try {
                    const result = await context.prisma.track.findUnique({
                        where: {
                            id: args.internalId,
                        }
                    })
                    return result
                } catch (error) {
                    throw error;
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
                type: stringArg(),
                isrc: stringArg(),
                title: stringArg(),
                length: stringArg(),
                internalId: stringArg(),
                updateDate: stringArg(),
                creationDate: stringArg(),
                productionDate: stringArg(),
            },
            async resolve(parent, args, context) {
                const updatedTrack = await context.prisma.track.update({
                    where: {
                        id: Number(args.internalId)
                    },
                    data: {
                        type: String(args.type),
                        isrc: String(args.isrc),
                        title: String(args.title),
                        length: String(args.length),
                        updateDate: String(args.updateDate),
                        creationDate: String(args.creationDate),
                        productionDate: String(args.productionDate),
                    },
                });
                return updatedTrack;
            },
        });
        t.field("deleteTrack", {
            type: "Track",
            args: {
                internalId: intArg(),
            },
            async resolve(parent, args, context) {
                try {
                    const deletedTrack = await context.prisma.track.delete({
                        where: {
                            id: Number(args.internalId),
                        },
                    });
                    return deletedTrack;
                } catch (error) {
                    throw error;
                }
            }
        });
    },
});
