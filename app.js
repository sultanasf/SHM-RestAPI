import express from 'express'
import morgan from 'morgan'
import { router } from './routes/cashier.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/shm-cashier', router)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})