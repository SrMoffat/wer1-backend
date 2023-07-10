import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const Track = objectType({
    name: "Track",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.int("length");
        t.nonNull.string("isrc");
        t.nonNull.string("productionDate");
        t.nonNull.string("creationDate");
        t.nonNull.string("type");
    },
});

export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("fetchTracks", {
            type: "Track",
            resolve(parent, args, context, info) {
                return context.prisma.track.findMany();
            },
        });
    },
});

export const GetTrackQuery = extendType({
    type: "Query",
    definition(t) {
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
            resolve(parent, args, context) {
                const track = context.prisma.track.create({
                    data: {
                        ...args
                    }
                });
                return track;
            },
        });
    },
});

export const UpdateTrackMutation = extendType({
    type: "Mutation",
    definition(t) {
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
    },
});

export const DeleteTrackMutation = extendType({
    type: "Mutation",
    definition(t) {
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

