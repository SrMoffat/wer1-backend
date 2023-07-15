import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { schema } from "./schema";
import { context } from "./context";

export const server = new ApolloServer({
    schema,
    context,
    // introspection: process.env.NODE_ENV !== "production",
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});