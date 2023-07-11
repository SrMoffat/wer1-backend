import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.track.create({
        data: {
            creationDate: `${new Date()}`,
            productionDate: `${new Date()}`,
            isrc: `${Math.floor(Math.random() * 10)}`,
            length: 3444,
            type: 'Fullstack tutorial for GraphQL',
            title: 'www.howtographql.com',
        },
    })
    const allTracks = await prisma.track.findMany();
    console.log(allTracks);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });