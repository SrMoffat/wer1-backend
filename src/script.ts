// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();


// 3
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

// 4
main()
    .catch((e) => {
        throw e;
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect();
    });