/*
  Warnings:

  - A unique constraint covering the columns `[registerToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_registerToken_key" ON "User"("registerToken");
