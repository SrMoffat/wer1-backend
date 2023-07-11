-- CreateTable
CREATE TABLE "_Likes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Likes_A_fkey" FOREIGN KEY ("A") REFERENCES "Track" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Likes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Likes_AB_unique" ON "_Likes"("A", "B");

-- CreateIndex
CREATE INDEX "_Likes_B_index" ON "_Likes"("B");
