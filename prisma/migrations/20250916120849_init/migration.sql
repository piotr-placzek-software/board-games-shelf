-- CreateTable
CREATE TABLE "GameDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "isExtensionFor" INTEGER
);

-- CreateTable
CREATE TABLE "PlayingHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameDetailsId" INTEGER NOT NULL,
    "playedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GameDetails_title_key" ON "GameDetails"("title");
