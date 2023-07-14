import { PrismaClient } from "@prisma/client";

import { fetchTracksByTitle } from "./utils";

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        const additionalParams = {
            title: "Trance"
        };
        const results = await fetchTracksByTitle({
            additionalParams
        })
        for (const track of results){
            await prisma.track.create({
               data: {
                ...track
               },
           })
        }
    } catch (error) {
        console.error("Error seeding DB==>", error);
    }
};

seedDatabase();
