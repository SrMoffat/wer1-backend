/*
  Warnings:

  - Added the required column `externalId` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "updateDate" TEXT NOT NULL;
