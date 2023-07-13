import { booleanArg, extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

let tracks: NexusGenObjects["Track"][] = [
    {
        externalId: "1",
        title: "I'm Only Human",
        type: "Pop",
        length: 180,
        isHit: true,
        isrc: "ISRC4535543",
        creationDate: "2015-8-10T00:00:00",
        productionDate: "2015-8-10T00:00:00",
    },
    {
        externalId: "2",
        title: "I'm Only Alien",
        type: "Rock",
        length: 190,
        isHit: true,
        isrc: "ISRC457575543",
        creationDate: "2095-8-10T00:00:00",
        productionDate: "2095-8-10T00:00:00",
    },
    {
        externalId: "3",
        title: "I'm Only",
        type: "Hip Hop",
        length: 210,
        isHit: true,
        isrc: "ISRC457575543",
        creationDate: "2095-8-10T00:00:00",
        productionDate: "2095-8-10T00:00:00",
    }
];

export const Track = objectType({
    name: "Track",
    definition(t) {
        t.nonNull.string("externalId");
        t.nonNull.string("isrc");
        t.nonNull.string("title");
        t.nonNull.string("type");
        t.nonNull.boolean("isHit");
        t.nonNull.int("length");
        t.nonNull.string("creationDate");
        t.nonNull.string("productionDate");
    },
});

export const TrackQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("fetchTracks", {
            type: "Track",
            resolve(parent, args, context) {
                return tracks;
            }
        })
    },
});

export const TrackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createTrack", {
            type: "Track",
            args: {
                externalId: nonNull(stringArg()),
                title: nonNull(stringArg()),
                type: nonNull(stringArg()),
                isrc: nonNull(stringArg()),
                length: nonNull(intArg()),
                productionDate: nonNull(stringArg()),
                creationDate: nonNull(stringArg()),
                isHit: nonNull(booleanArg())
            },
            resolve(parent, args, context) {
                let idCount = tracks.length + 1;
                const track = {
                    internalId: idCount,
                    id: String(idCount),
                    ...args
                }
                tracks.push(track)
                return track;
            }
        });
        t.field("updateTrack", {
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
        t.field("deleteTrack", {
            type: "Track",
            args: {
                externalId: stringArg(),
            },
            resolve(parent, args, context) {
                const remainingTracks = tracks.filter(track => track.externalId !== args.externalId);
                const candidateTrack = tracks.filter(track => track.externalId === args.externalId);
                tracks = remainingTracks as NexusGenObjects["Track"][]
                return candidateTrack
            },
        });
    },
});
