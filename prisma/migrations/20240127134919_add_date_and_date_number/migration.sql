/*
  Warnings:

  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `dateNumber` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Response` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
ADD COLUMN     "dateNumber" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Response_pkey" PRIMARY KEY ("dateNumber", "userId");
