-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "isrc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "productionDate" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);
