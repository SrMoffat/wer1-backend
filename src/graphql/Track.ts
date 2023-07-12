import { extendType, nonNull, objectType, stringArg, intArg, inputObjectType, enumType, arg, list } from "nexus";
import { Prisma } from "@prisma/client";

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"],
});

export const TrackOrderByInput = inputObjectType({
    name: "TrackOrderByInput",
    definition(t) {
        t.field("title", { type: Sort });
        t.field("length", { type: Sort });
        t.field("type", { type: Sort });
        t.field("createdAt", { type: Sort });
        t.field("productionDate", { type: Sort });
        t.field("creationDate", { type: Sort });
    },
});

export const TrackFeed = objectType({
    name: "TrackFeed",
    definition(t) {
        t.nonNull.list.nonNull.field("tracks", { type: "Track" });
        t.nonNull.int("count");
        t.id("id");
    },
});

export const Track = objectType({
    name: "Track",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.int("length");
        t.nonNull.string("isrc");
        t.nonNull.string("productionDate");
        t.nonNull.string("creationDate");
        t.nonNull.dateTime("createdAt");
        t.nonNull.string("type");
        t.field("addedBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.track.findUnique({
                    where: {
                        id: parent.id
                    }
                }).addedBy()
            }
        });
        t.nonNull.list.nonNull.field("likes", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.track.findUnique({
                    where: {
                        id: parent.id
                    }
                }).likes()
            }
        })
    },
});

export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("fetchTracks", {
            type: "TrackFeed",
            args: {
                filter: stringArg(),
                skip: intArg(),
                take: intArg(),
                orderBy: arg({ type: list(nonNull(TrackOrderByInput)) })
            },
            async resolve(parent, args, context, info) {
                const where = args.filter
                    ? { OR: [{ title: { contains: args.filter } }, { type: { contains: args.filter } }] }
                    : {}
                const tracks = await context.prisma.track.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                    orderBy: args?.orderBy as
                        | Prisma.Enumerable<Prisma.TrackOrderByWithRelationInput>
                        | undefined,
                });

                const count = await context.prisma.track.count({ where });
                const id = `main-feed:${JSON.stringify(args)}`;

                return {
                    tracks,
                    count,
                    id,
                }
            },
        });
        t.field("getTrack", {
            type: "Track",
            args: {
                id: nonNull(intArg()),
            },
            resolve(parent, args, context, info) {
                return context.prisma.track.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
        });
    },
});

export const TrackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createTrack", {
            type: "Track",
            args: {
                title: nonNull(stringArg()),
                isrc: nonNull(stringArg()),
                length: nonNull(intArg()),
                productionDate: nonNull(stringArg()),
                creationDate: nonNull(stringArg()),
                type: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const { userId } = context;
                if (!userId) {
                    throw new Error("Invalid credentials");
                }
                const track = await context.prisma.track.create({
                    data: {
                        ...args,
                        addedBy: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                });
                console.log(track)
                return track;
            },
        });
        t.nonNull.field("updateTrack", {
            type: "Track",
            args: {
                type: stringArg(),
                isrc: stringArg(),
                title: stringArg(),
                length: stringArg(),
                id: nonNull(intArg()),
                creationDate: stringArg(),
                productionDate: stringArg(),
            },
            resolve(parent, args, context) {
                const { title, isrc, length, productionDate, creationDate, type } = args;
                return context.prisma.track.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        // ...args,
                    }
                });
            },
        });
        t.nonNull.field("deleteTrack", {
            type: "Track",
            args: {
                id: nonNull(intArg()),
            },
            resolve(parent, args, context) {
                return context.prisma.track.delete({
                    where: {
                        id: args.id
                    }
                });
            },
        });
    },
});
