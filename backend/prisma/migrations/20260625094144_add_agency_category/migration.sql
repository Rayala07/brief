/*
  Warnings:

  - You are about to drop the column `owner` on the `agencies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `agencies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `agencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `agencies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "agencies_owner_key";

-- AlterTable
ALTER TABLE "agencies" DROP COLUMN "owner",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "agencies_ownerId_key" ON "agencies"("ownerId");
