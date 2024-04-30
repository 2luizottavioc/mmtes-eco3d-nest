/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_cnpj` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf_cnpj` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_cnpj_key` ON `User`(`cpf_cnpj`);
