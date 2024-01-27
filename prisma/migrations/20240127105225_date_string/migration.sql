/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Response_userId_date_key" ON "Response"("userId", "date");
