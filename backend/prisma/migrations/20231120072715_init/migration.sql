-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Peer" (
    "peerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "matriculationNumber" TEXT,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Peer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Peer" ("email", "firstName", "lastName", "matriculationNumber", "peerId", "userId") SELECT "email", "firstName", "lastName", "matriculationNumber", "peerId", "userId" FROM "Peer";
DROP TABLE "Peer";
ALTER TABLE "new_Peer" RENAME TO "Peer";
CREATE UNIQUE INDEX "Peer_email_key" ON "Peer"("email");
CREATE UNIQUE INDEX "Peer_userId_key" ON "Peer"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
