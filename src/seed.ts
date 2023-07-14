import { PrismaClient } from "@prisma/client";

import { fetchTracksByTitle } from "./utils";

const prisma = new PrismaClient();

const MUSIC_STORY_LANGUAGE = "en";
const MUSIC_STORY_BASE_URL = "https://api.music-story.com";

async function seedDatabase() {
    try {
        const additionalParams = {
            title: "Trance"
        };
        const url = `${MUSIC_STORY_BASE_URL}/${MUSIC_STORY_LANGUAGE}/track/search`;
        const results = await fetchTracksByTitle({
            method: "GET",
            url,
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
        console.error("Erroor==>", error);
    }
};

seedDatabase();
