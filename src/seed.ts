import axios from "axios";
import { PrismaClient } from "@prisma/client";

const MUSIC_STORY_BASE_URL = "http://api.music-story.com";
const MUSIC_STORY_LANGUAGE = "en";
const TRACK_ID = "25462597651544488";

const prisma = new PrismaClient();

async function main() {
    try {
        // Fetch 10 tracks
        console.log("=====Tracks=======");
        const response = await axios({
            method: 'GET',
            url: `${MUSIC_STORY_BASE_URL}/${MUSIC_STORY_LANGUAGE}/track/${TRACK_ID}`,
            // responseType: 'stream'
        })
        const data = await response.data
        console.log("=====data=======", data);

            // .then(function (response) {
            //     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            // });
        // const newLink = await prisma.track.create({
        //     data: {
        //         creationDate: `${new Date()}`,
        //         productionDate: `${new Date()}`,
        //         isrc: `${Math.floor(Math.random() * 10)}`,
        //         length: 344,
        //         type: "HipHop",
        //         title: "I'm Only Human",
        //     },
        // })
        // const allTracks = await prisma.track.findMany();
        // console.log({
        //     newLink,
        //     allTracks
        // })
    } catch (error) {
        console.log("=====Error=======");
        console.log(error);
    } finally {
        console.log("=====Finally======");
        await prisma.$disconnect();
    }
}

main();

