import { extendType, intArg, nonNull, objectType } from "nexus";
import { User } from "@prisma/client";

export const Like = objectType({
    name: "Like",
    definition(t) {
        t.nonNull.field("track", { type: "Track" });
        t.nonNull.field("user", { type: "User" });
    },
});

export const LikeMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("like", {
            type: "Like",
            args: {
                trackId: nonNull(intArg())
            },
            async resolve(parent, args, context) {
                const { userId } = context;
                const { trackId } = args;
                if (!userId) {
                    throw new Error("Invalid credentials");
                }
                const track = await context.prisma.track.update({
                    where: {
                        id: trackId
                    },
                    data: {
                        likes: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })
                const user = await context.prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                return {
                    track,
                    user: user as User
                }
            }
        })
    },
});