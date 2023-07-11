import { objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.list.nonNull.field("tracks", {
            type: "Track",
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({
                    where: {
                        id: parent.id
                    }
                }).tracks()
            }
        });
        t.nonNull.list.nonNull.field("likes", {
            type: "Like",
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({
                    where: {
                        id: parent.id
                    }
                }).likes()
            }
        })
    }
});