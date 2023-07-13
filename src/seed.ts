import { PrismaClient } from "@prisma/client";

import { generateSignature, fetchTracksByTitle } from "./utils";

const prisma = new PrismaClient();

const MUSIC_STORY_BASE_URL = "https://api.music-story.com";
const MUSIC_STORY_LANGUAGE = "en";

// (async () => {
//     try {
// const requestDetails = {
//     method,
//     url: apiUrl,
//     additionalParams
// }
//         const res = await makeOAuthRequest(requestDetails)
//         console.log("Data==>", res);
//     } catch (error) {
// console.error("Erroor==>", error);
//     }
// })();

async function seedDatabase() {
    try {
        // const newLink = await prisma.track.create({
        //     data: {
        //         title: 'Rap Kwa MIC',
        //         type: 'HipHop',
        //         isrc: "RAPMIC56789",
        //         length: 635353,
        //         creationDate: `${new Date()}`,
        //         productionDate: `${new Date()}`,
        //     },
        // })
        // console.error("newLink==>", newLink);

        const additionalParams = {
            title: "Trance"
        };
        const url = `${MUSIC_STORY_BASE_URL}/${MUSIC_STORY_LANGUAGE}/track/search`;

        const results = await fetchTracksByTitle({
            method: "GET",
            url,
            additionalParams
        })
        // console.log("results==>", results);



    } catch (error) {
        console.error("Erroor==>", error);
    }
}

seedDatabase();