/*
  Warnings:

  - You are about to drop the column `postedById` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_postedById_fkey";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "postedById",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
