import { server } from "./server";

const port = process.env.PORT;

server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
