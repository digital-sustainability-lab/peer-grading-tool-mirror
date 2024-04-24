-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "campaignId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openingDate" DATETIME,
    "closingDate" DATETIME,
    "language" TEXT NOT NULL DEFAULT 'de'
);
INSERT INTO "new_Campaign" ("campaignId", "closingDate", "language", "maxPoints", "name", "openingDate") SELECT "campaignId", "closingDate", "language", "maxPoints", "name", "openingDate" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
