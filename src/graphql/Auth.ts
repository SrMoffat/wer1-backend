import { stringArg, nonNull, extendType } from "nexus";

import { loginResolver, signupResolver } from "./resolvers";

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", { 
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: loginResolver
        });
        t.nonNull.field("signup", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve: signupResolver
           
        });
    },
});
