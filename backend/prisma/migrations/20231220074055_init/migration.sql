-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grading" (
    "fromPeerId" INTEGER NOT NULL,
    "toPeerId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "Grading_fromPeerId_fkey" FOREIGN KEY ("fromPeerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grading_toPeerId_fkey" FOREIGN KEY ("toPeerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grading_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grading_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria" ("criteriaId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grading" ("criteriaId", "fromPeerId", "groupId", "points", "toPeerId") SELECT "criteriaId", "fromPeerId", "groupId", "points", "toPeerId" FROM "Grading";
DROP TABLE "Grading";
ALTER TABLE "new_Grading" RENAME TO "Grading";
CREATE UNIQUE INDEX "Grading_fromPeerId_toPeerId_groupId_criteriaId_key" ON "Grading"("fromPeerId", "toPeerId", "groupId", "criteriaId");
CREATE TABLE "new_Peer" (
    "peerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "matriculationNumber" TEXT,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Peer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Peer" ("email", "firstName", "lastName", "matriculationNumber", "peerId", "userId") SELECT "email", "firstName", "lastName", "matriculationNumber", "peerId", "userId" FROM "Peer";
DROP TABLE "Peer";
ALTER TABLE "new_Peer" RENAME TO "Peer";
CREATE UNIQUE INDEX "Peer_email_key" ON "Peer"("email");
CREATE UNIQUE INDEX "Peer_userId_key" ON "Peer"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
