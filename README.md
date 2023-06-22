# SHM-RestAPI

RestAPI for car service cashier app

# SETUP PROJECT

## Environment variable

DATABASE_URL="postgresql://[your_username]:[your_password]@localhost:5432/shm"

## Database Migration

-npx prisma generate
-npx prisma migrate dev

# API ENDPOINT

## Get Transaction list

-method : GET
-endpoint : http://localhost:3000/shm-cashier

## Make New Transaction

-method : POST
-endpoint : http://localhost:3000/shm-cashier
-request body : //mutiple deatilKerusakanData

```JSON
{
    "tanggal": "2023-06-21",
    "jenisMobil": "Daihatsu Terios",
    "platNomor": "DK 1234 LK",
    "statusSelesai": "Belum",
    "statusPembayaran": "Belum",
    "detailKerusakanData": [
        {
            "jenisKerusakan": "Ganti Oli",
            "hargaPerbaikan": 150000
        },
        {
            "jenisKerusakan": "Instalasi Sound System",
            "hargaPerbaikan": 1200000
        }
    ]
}
```

## Add Detail_Kerusakan By Transaction ID

-method : POST
-endpoint : http://localhost:3000/shm-cashier/add-detail
-request body :

```JSON
{
    "transaksi_id": 3,
    "detail_kerusakan": [
        {
            "kerusakan": "Instalasi Sound Sistem",
            "harga_perbaikan": 800000
        }
    ]
}
```

## Change Finish and Payment Status

-method : PATCH
-endpoint : http://localhost:3000/shm-cashier/edit-status
-request body :

```JSON
{
    "transaksiId": 3,
    "statusPembayaran": "Belum",
    "statusSelesai": "Selesai"
}
```
