import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { schema } from "./schema";
import { context } from "./context";
import { formatError } from "./utils/errorHandler";

export const server = new ApolloServer({
    schema,
    context,
    formatError,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});