import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { GraphQLError } from 'graphql';

import { userSignUpSchema } from "../../utils/validators";
import { APP_SECRET_KEY, INVALID_AUTH_ERROR } from "../../constants";

export const loginResolver = async (parent: any, args: any, context: any) => {
    const user = await context.prisma.user.findUnique({
        where: { email: args.email },
    });
    if (!user) {
        throw new GraphQLError(INVALID_AUTH_ERROR, {
            // @ts-ignore
            extensions: {
                code: 'USER_NOT_FOUND',
                statusCode: 404
            },
        });
    };
    const valid = await bcrypt.compare(
        args.password,
        user.password,
    );
    if (!valid) {
        throw new GraphQLError(INVALID_AUTH_ERROR, {
            // @ts-ignore
            extensions: {
                code: 'INVALID_CREDENTIALS',
                statusCode: 403
            },
        });
    };
    const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
    return {
        token,
        user,
    };
};
export const signupResolver = async (parent: any, args: any, context: any) => {
    const { email, name } = args;
    await userSignUpSchema.validate(args);
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
    return {
        token,
        user
    };
};
