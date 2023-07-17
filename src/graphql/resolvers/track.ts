import { uniqBy, omit } from "lodash";
import { GraphQLError } from 'graphql';

import { fetchTracksByTitle } from "../../utils";
import { INVALID_AUTH_ERROR, SERVER_ERROR } from "../../constants";

export const fetchTracksResolver = async (parent: any, args: any, context: any) => {
    try {
        if (!context.userId) {
            throw new GraphQLError(INVALID_AUTH_ERROR, {
                // @ts-ignore
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                    statusCode: 400
                },
            });
        };
        return await context.prisma.track.findMany();
    } catch (error) {
        throw error;
    };
};
export const searchTrackByTitleResolver = async (parent: any, args: any, context: any) => {
    try {
        if (!context.userId) {
            throw new GraphQLError(INVALID_AUTH_ERROR, {
                // @ts-ignore
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                    statusCode: 400
                },
            });
        };
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
            });
            const hasExternalResults = musicStoryResults.length;
            if (hasExternalResults) {
                // Add each to DB
                const dedupedResults = uniqBy(musicStoryResults, "isrc")
                for (const track of dedupedResults) {
                    await context.prisma.track.create({
                        data: {
                            ...track
                        },
                    });
                };
                // Return results from Music Story after insert to DB
                return dedupedResults;
            } else {
                // Return 404 no results from Music Story and our DB
                return [];
            };
        };
    } catch (error) {
        throw error;
    };
};
export const searchTrackByInternalIdResolver = async (parent: any, args: any, context: any) => {
    try {
        if (!context.userId) {
            throw new GraphQLError(INVALID_AUTH_ERROR, {
                // @ts-ignore
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                    statusCode: 400
                },
            });
        };
        const result = await context.prisma.track.findUnique({
            where: {
                id: args.internalId,
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};
export const updateTrackResolver = async (parent: any, args: any, context: any) => {
    try {
        if (!context.userId) {
            throw new GraphQLError(INVALID_AUTH_ERROR, {
                // @ts-ignore
                extensions: {
                    code: 'INVALID_CREDENTIALS',
                    statusCode: 400
                },
            });
        };
        const updatedTrack = await context.prisma.track.update({
            where: {
                id: Number(args.internalId)
            },
            data: {
                ...omit(args, "internalId") as any,
            },
        });
        return updatedTrack;
    } catch (error) {
        throw error;
    }
};
export const deleteTrackResolver = async (parent: any, args: any, context: any) => {
    try {
        if (!context.userId) {
            throw new Error("Invalid credentials");
        }
        const deletedTrack = await context.prisma.track.delete({
            where: {
                id: Number(args.internalId),
            },
        });
        return deletedTrack;
    } catch (error) {
        throw error;
    }
};