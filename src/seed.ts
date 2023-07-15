import * as bcrypt from "bcryptjs";

import { uniqBy } from "lodash";
import { PrismaClient } from "@prisma/client";

import {
    SEED_USERS,
    SEED_MIN_ROW_COUNT,
    SEED_TRACK_TITLE_SEARCH,
    SEED_TRACK_UNIQUE_ID_PROPERTY,
    SEED_TRACK_FALLBACK_TITLE_SEARCH,
} from "./constants";
import { fetchTracksByTitle } from "./utils";

const prisma = new PrismaClient();

const seedUsers = async () => {
    for (const user of SEED_USERS) {
        const password = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
            data: {
                ...user,
                password
            }
        })
    }
};
const seedTracks = async () => {
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
};
async function seedDatabase() {
    try {
        await seedUsers();
        await seedTracks();
    } catch (error) {
        console.error("Error seeding DB==>", error);
    }
};
seedDatabase();
