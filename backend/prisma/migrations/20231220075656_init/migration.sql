-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "groupId" INTEGER NOT NULL,
    "peerId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("groupId", "peerId"),
    CONSTRAINT "Comment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("groupId", "peerId", "text") SELECT "groupId", "peerId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_GroupPeerConnection" (
    "groupId" INTEGER NOT NULL,
    "peerId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("groupId", "peerId"),
    CONSTRAINT "GroupPeerConnection_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GroupPeerConnection_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GroupPeerConnection" ("groupId", "link", "peerId") SELECT "groupId", "link", "peerId" FROM "GroupPeerConnection";
DROP TABLE "GroupPeerConnection";
ALTER TABLE "new_GroupPeerConnection" RENAME TO "GroupPeerConnection";
CREATE UNIQUE INDEX "GroupPeerConnection_link_key" ON "GroupPeerConnection"("link");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
