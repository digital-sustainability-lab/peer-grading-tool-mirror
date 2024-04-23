/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `peerId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `fromPeerId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "groupId" INTEGER NOT NULL,
    "fromPeerId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("groupId", "fromPeerId", "toUserId"),
    CONSTRAINT "Comment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_fromPeerId_fkey" FOREIGN KEY ("fromPeerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_Comment" ("groupId", "text") SELECT "groupId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
