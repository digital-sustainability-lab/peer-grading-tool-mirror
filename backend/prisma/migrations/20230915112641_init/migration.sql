-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "campaignId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "openingDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closingDate" DATETIME NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'de'
);
INSERT INTO "new_Campaign" ("campaignId", "closingDate", "maxPoints", "name", "openingDate") SELECT "campaignId", "closingDate", "maxPoints", "name", "openingDate" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
