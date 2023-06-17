import express from "express"
import cashier from "../controllers/cashier.js"

const router = express.Router()

router.post('/', cashier.insertTransaksi)
router.get('/', cashier.getTransaksi)

router.post('/add-detail', cashier.addDetailKerusakan)
router.patch('/edit-status', cashier.updateStatusTransaksi)

export {
    router
}