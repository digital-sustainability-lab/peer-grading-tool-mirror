const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // deactivating pragma foreign keys now because it won't work inside transaction
  await prisma.$executeRaw`PRAGMA foreign_keys=OFF`;

  try {
    await prisma.$transaction(async (tx) => {
      //////////////////////////////////////////// new comments section

      // renaming Comment to old_Comment
      await tx.$executeRaw`ALTER TABLE Comment RENAME TO old_Comment`;

      // creating new comments table
      await tx.$executeRaw`
      CREATE TABLE "Comment" (
        "groupId" INTEGER NOT NULL,
        "fromPeerId" INTEGER NOT NULL,
        "toUserId" INTEGER NOT NULL,
        "text" TEXT NOT NULL,
      
        PRIMARY KEY ("groupId", "fromPeerId", "toUserId"),
        CONSTRAINT "Comment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "_Group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "Comment_fromPeerId_fkey" FOREIGN KEY ("fromPeerId") REFERENCES "Peer" ("peerId") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "Comment_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
      );
      `;

      // getting all needed data from old comments table
      const oldCommentsWithUserId =
        await tx.$queryRaw`SELECT OC.groupId, OC.peerId, CTU.B AS userId, OC.text
      FROM old_Comment OC
      JOIN _Group G ON G.groupId == OC.groupId 
      JOIN Campaign C ON C.campaignId == G.campaignId 
      JOIN _CampaignToUser CTU ON CTU.A == C.campaignId;`;

      // for each entry in the comments got, create a new one with toUserId in the new comments table
      for (const comment of oldCommentsWithUserId) {
        await tx.comment.create({
          data: {
            groupId: comment.groupId,
            fromPeerId: comment.peerId,
            toUserId: comment.userId,
            text: comment.text,
          },
        });
      }

      //////////////////////////////////////////// new registerToken section

      await tx.$executeRaw`ALTER TABLE "User" ADD COLUMN "company" TEXT;`;
      await tx.$executeRaw`ALTER TABLE User ADD COLUMN "registerToken" TEXT;`;
      await tx.$executeRaw`CREATE UNIQUE INDEX "User_registerToken_key" ON "User"("registerToken");`;

      //////////////////////////////////////////// foreign key fix section

      // dropping old tables
      await tx.$executeRaw`DROP TABLE old_Comment`;

      await tx.$executeRaw`ALTER TABLE Comment RENAME TO old_Comment`;
      await tx.$executeRaw`ALTER TABLE old_Comment RENAME TO Comment`;

      // throwing intentional error to not execute the query
      // throw new Error('intentional abort');
    });
  } catch (error) {
    console.error('got the error:', error.message);
  } finally {
    // activating pragma foreign keys
    await prisma.$queryRaw`PRAGMA foreign_key_check;`;
    await prisma.$queryRaw`PRAGMA foreign_keys=ON`;

    await prisma.$disconnect();
  }
}

main();
