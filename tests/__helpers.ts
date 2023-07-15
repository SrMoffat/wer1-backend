// tests/__helpers.ts
import { ApolloServer } from "apollo-server";

import { schema } from "../src/schema";
import { context } from "../src/context";

type TestContext = {
    client: ApolloServer;
};

type TestContextArgs = Object;

export function createTestContext(args?: TestContextArgs): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext(args);
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
function graphqlTestContext(args?: TestContextArgs) {
    let testServer: ApolloServer
    return {
        async before() {
            testServer = new ApolloServer({
                schema,
                context: {
                    ...context,
                    ...args
                },
            });
            return testServer;
        },
        async after() {
            testServer.stop();
        },
    };
};
