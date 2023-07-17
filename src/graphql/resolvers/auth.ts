import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { APP_SECRET_KEY } from "../../utils/auth";

export const loginResolver = async (parent: any, args: any, context: any) => {
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
};
export const signupResolver = async (parent: any, args: any, context: any) => {
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
};
