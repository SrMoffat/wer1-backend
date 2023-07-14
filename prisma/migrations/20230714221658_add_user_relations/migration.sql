-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "postedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
