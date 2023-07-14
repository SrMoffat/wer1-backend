import { uniqBy } from "lodash";
import { PrismaClient } from "@prisma/client";

import { fetchTracksByTitle } from "./utils";

const SEED_MIN_ROW_COUNT = 10;
const SEED_TRACK_TITLE_SEARCH = "Trance";
const SEED_TRACK_UNIQUE_ID_PROPERTY = "isrc";
const SEED_TRACK_FALLBACK_TITLE_SEARCH = "Dubstep";

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        const additionalParams = {
            title: SEED_TRACK_TITLE_SEARCH,
            page: 1,
        };
        const results = await fetchTracksByTitle({
            additionalParams
        });
        const uniqueResults = uniqBy(results, SEED_TRACK_UNIQUE_ID_PROPERTY);
        const hasEnoughResults = uniqueResults.length >= SEED_MIN_ROW_COUNT;
        if (hasEnoughResults) {
            for (const track of uniqueResults) {
                await prisma.track.create({
                    data: {
                        ...track
                    },
                })
            }
            return
        } else {
            const fallbackParams = {
                title: SEED_TRACK_FALLBACK_TITLE_SEARCH,
                page: 2
            }
            const secondResults = await fetchTracksByTitle({
                additionalParams: fallbackParams
            });
            const secondUniqueResults = uniqBy(secondResults, SEED_TRACK_UNIQUE_ID_PROPERTY);
            const mergedResults = uniqBy(uniqueResults.concat(secondUniqueResults), SEED_TRACK_UNIQUE_ID_PROPERTY);

            for (const fallbackTrack of mergedResults) {
                await prisma.track.create({
                    data: {
                        ...fallbackTrack
                    },
                })
            }
            return
        }
    } catch (error) {
        console.error("Error seeding DB==>", error);
    }
};

seedDatabase();
