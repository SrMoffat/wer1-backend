// tests/__helpers.ts
import { ApolloServer } from "apollo-server";

import { schema } from "../src/schema";
import { context } from "../src/context";

type TestContext = {
    client: ApolloServer;
};

export function createTestContext(): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext();
    beforeEach(async () => {
        const client = await graphqlCtx.before();
        Object.assign(ctx, {
            client,
        });
    });
    afterEach(async () => {
        await graphqlCtx.after();
    });
    return ctx;
};
function graphqlTestContext() {
    let testServer: ApolloServer
    return {
        async before() {
            testServer = new ApolloServer({
                schema,
                context,
            });
            return testServer;
        },
        async after() {
            // TODO: Cleanup test DB
        },
    };
};