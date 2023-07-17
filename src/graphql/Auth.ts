import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { stringArg, nonNull, extendType } from "nexus";

import { APP_SECRET_KEY } from "../utils/auth";
import { userLoginSchema, userSignUpSchema } from "../utils/validators";

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", { 
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const user = await context.prisma.user.findUnique({
                    where: { email: args.email },
                });
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                );
                if (!valid) {
                    throw new Error("Invalid credentials");
                }
                const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
                return {
                    token,
                    user,
                };
            },
        });
        t.nonNull.field("signup", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                // TODO: Add inout validation e.g. for email and password use Yup
                const { email, name } = args;
                const password = await bcrypt.hash(args.password, 10);
                const user = await context.prisma.user.create({
                    data: {
                        email,
                        name,
                        password
                    }
                })
                const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
                return {
                    token,
                    user
                }
            }
        });
    },
});
