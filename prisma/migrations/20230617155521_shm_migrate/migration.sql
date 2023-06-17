-- CreateTable
CREATE TABLE "Mobil" (
    "mobil_id" SERIAL NOT NULL,
    "jenis_mobil" TEXT NOT NULL,
    "plat_nomor" TEXT NOT NULL,

    CONSTRAINT "Mobil_pkey" PRIMARY KEY ("mobil_id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "transaksi_id" SERIAL NOT NULL,
    "mobil_id" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,
    "status_selesai" TEXT NOT NULL,
    "status_pembayaran" TEXT NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("transaksi_id")
);

-- CreateTable
CREATE TABLE "Detail_Kerusakan" (
    "detail_id" SERIAL NOT NULL,
    "transaksi_id" INTEGER NOT NULL,
    "kerusakan" TEXT NOT NULL,
    "harga_perbaikan" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Detail_Kerusakan_pkey" PRIMARY KEY ("detail_id")
);

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_mobil_id_fkey" FOREIGN KEY ("mobil_id") REFERENCES "Mobil"("mobil_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Kerusakan" ADD CONSTRAINT "Detail_Kerusakan_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "Transaksi"("transaksi_id") ON DELETE RESTRICT ON UPDATE CASCADE;
