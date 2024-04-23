-- CreateTable
CREATE TABLE "Peer" (
    "peerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "matriculationNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Peer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "groupId" INTEGER NOT NULL,
    "peerId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("groupId", "peerId"),
    CONSTRAINT "Comment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("peerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Group" (
    "groupId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "campaignId" INTEGER NOT NULL,
    CONSTRAINT "_Group_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("campaignId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Criteria" (
    "criteriaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    CONSTRAINT "Criteria_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("campaignId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Campaign" (
    "campaignId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "openingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closingDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Grading" (
    "fromPeerId" INTEGER NOT NULL,
    "toPeerId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "Grading_fromPeerId_fkey" FOREIGN KEY ("fromPeerId") REFERENCES "Peer" ("peerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grading_toPeerId_fkey" FOREIGN KEY ("toPeerId") REFERENCES "Peer" ("peerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grading_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grading_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria" ("criteriaId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GroupPeerConnection" (
    "groupId" INTEGER NOT NULL,
    "peerId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("groupId", "peerId"),
    CONSTRAINT "GroupPeerConnection_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GroupPeerConnection_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "Peer" ("peerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CampaignToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CampaignToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign" ("campaignId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CampaignToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role" ("roleId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Peer_email_key" ON "Peer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Peer_userId_key" ON "Peer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Grading_fromPeerId_toPeerId_groupId_criteriaId_key" ON "Grading"("fromPeerId", "toPeerId", "groupId", "criteriaId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GroupPeerConnection_link_key" ON "GroupPeerConnection"("link");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToUser_AB_unique" ON "_CampaignToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToUser_B_index" ON "_CampaignToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");
