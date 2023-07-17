import { objectType } from "nexus";

export const SanitizedUser = objectType({
    name: "SanitizedUser",
    definition(t) {
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.int("id");
    },
});
export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.string("token");
        t.nonNull.field("user", {
            type: "SanitizedUser"
        })
    },
});
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
export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.string("password");
    }
});