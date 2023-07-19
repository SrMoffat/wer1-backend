import { Request } from "express";
import { PrismaClient } from "@prisma/client";

import { AppContext } from "../types";
import { decodeAuthHeader } from "./utils/auth";

export const prisma = new PrismaClient();

export const context = ({ req }: { req: Request }): AppContext => {
    const token = req && req.headers.authorization
        ? decodeAuthHeader(req.headers.authorization)
        : null
    return {
        prisma,
        userId: token?.userId
    }
};

export type Context = typeof context
