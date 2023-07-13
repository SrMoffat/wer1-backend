import { makeOAuthRequest } from "./utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MUSIC_STORY_BASE_URL = "https://api.music-story.com";
const apiUrl = `${MUSIC_STORY_BASE_URL}/oauth/request_token`;
const method = 'GET';
const additionalParams = {}; // Additional parameters for the request, if any

// (async () => {
//     try {
//         const requestDetails = {
//             method,
//             url: apiUrl,
//             additionalParams
//         }
//         const res = await makeOAuthRequest(requestDetails)
//         console.log("Data==>", res);
//     } catch (error) {
// console.error("Erroor==>", error);
//     }
// })();

async function seedDatabase() {
    try {
        const newLink = await prisma.track.create({
            data: {
                title: 'Rap Kwa MIC',
                type: 'HipHop',
                isrc: "RAPMIC56789",
                length: 635353,
                creationDate: `${new Date()}`,
                productionDate: `${new Date()}`,
            },
        })
        console.error("newLink==>", newLink);

    } catch (error) {
        console.error("Erroor==>", error);
    }
}

seedDatabase();