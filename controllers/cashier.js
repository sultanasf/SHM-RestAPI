import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const insertTransaksi = async (req, res) => {
    try {
        const { tanggal, jenisMobil, platNomor, detailKerusakanData, statusPembayaran, statusSelesai } = req.body

        // Buat mobil baru
        const mobil = await prisma.mobil.create({
            data: {
                jenis_mobil: jenisMobil,
                plat_nomor: platNomor,
            },
        })

        // Hitung total harga dari detail kerusakan
        const totalHarga = detailKerusakanData.reduce(
            (total, kerusakan) => total + kerusakan.hargaPerbaikan,
            0
        )

        // Buat transaksi baru
        const transaksi = await prisma.transaksi.create({
            data: {
                tanggal: new Date(tanggal),
                total_harga: totalHarga,
                status_selesai: statusSelesai,
                status_pembayaran: statusPembayaran,
                mobil: {
                    connect: { mobil_id: mobil.mobil_id },
                },
                detail_kerusakan: {
                    createMany: {
                        data: detailKerusakanData.map((kerusakan) => ({
                            kerusakan: kerusakan.jenisKerusakan,
                            harga_perbaikan: kerusakan.hargaPerbaikan,
                        })),
                    },
                },
            },
            include: {
                mobil: true,
                detail_kerusakan: true,
            },
        })

        res.json({
            success: true,
            message: "Transaksi berhasil dibuat",
            result: transaksi,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan dalam membuat transaksi",
            error: error.message
        })
    }
}

const getTransaksi = async (req, res) => {
    try {
        const transaksiData = await prisma.transaksi.findMany({
            select: {
                transaksi_id: true,
                tanggal: true,
                total_harga: true,
                status_selesai: true,
                status_pembayaran: true,
                mobil: {
                    select: {
                        jenis_mobil: true,
                        plat_nomor: true,
                    },
                },
                detail_kerusakan: {
                    select: {
                        kerusakan: true,
                        harga_perbaikan: true,
                    },
                },
            },
        })

        const formattedTransaksiData = transaksiData.map((transaksi) => ({
            transaksi_id: transaksi.transaksi_id,
            detail_transaksi: {
                tanggal: transaksi.tanggal,
                total_harga: transaksi.total_harga,
                status_selesai: transaksi.status_selesai,
                status_pembayaran: transaksi.status_pembayaran,
                mobil: transaksi.mobil,
                detail_kerusakan: transaksi.detail_kerusakan,
            },
        }))
        res.json({
            success: true,
            result: formattedTransaksiData,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan dalam mengambil data transaksi",
        })
    }
}

const addDetailKerusakan = async (req, res) => {
    try {
        const { transaksi_id, detail_kerusakan } = req.body;

        // Cari transaksi berdasarkan transaksi_id
        const existingTransaksi = await prisma.transaksi.findUnique({
            where: { transaksi_id },
            include: {
                mobil: true,
                detail_kerusakan: true,
            },
        });

        if (!existingTransaksi) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        const kerusakanData = detail_kerusakan.map((item) => ({
            kerusakan: item.kerusakan,
            harga_perbaikan: item.harga_perbaikan,
        }));

        const totalHarga = existingTransaksi.total_harga + kerusakanData.reduce((total, item) => total + item.harga_perbaikan, 0);

        const updatedTransaksi = await prisma.transaksi.update({
            where: { transaksi_id },
            data: {
                total_harga: totalHarga,
                detail_kerusakan: {
                    createMany: {
                        data: kerusakanData,
                    },
                },
            },
            include: {
                mobil: true,
                detail_kerusakan: true,
            },
        });

        res.json({
            success: true,
            message: "Detail kerusakan berhasil ditambahkan pada transaksi",
            result: updatedTransaksi,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan dalam menambahkan detail kerusakan",
            error: error.message,
        });
    }
};

const updateStatusTransaksi = async (req, res) => {
    try {
        const { transaksiId, statusPembayaran, statusSelesai } = req.body;

        const transaksi = await prisma.transaksi.update({
            where: { transaksi_id: transaksiId },
            data: {
                status_pembayaran: statusPembayaran,
                status_selesai: statusSelesai,
            },
        })

        res.json({
            success: true,
            message: "Status transaksi berhasil diperbarui",
            result: transaksi,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan dalam memperbarui status transaksi",
        })
    }
}

export default {
    insertTransaksi, getTransaksi, addDetailKerusakan, updateStatusTransaksi
}