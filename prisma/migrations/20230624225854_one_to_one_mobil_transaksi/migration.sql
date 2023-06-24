/*
  Warnings:

  - A unique constraint covering the columns `[mobil_id]` on the table `Transaksi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaksi_mobil_id_key" ON "Transaksi"("mobil_id");
