import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.config.js"
import {verifyWebhook} from "@clerk/express/webhooks"
import webhookRouter from "./controllers/webhook.controller.js"
import companyRouter from "./routes/company.route.js"
import connectCloudinary from "./config/cloudinary.config.js"
import cookieParser from "cookie-parser"
import jobRouter from "./routes/job.route.js"

const app = express()
const PORT = process.env.PORT || 4000

await connectDB()
await connectCloudinary()

app.use("/webhook", webhookRouter)

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/company", companyRouter)
app.use("/api/jobs", jobRouter)

app.listen(PORT, () => {
    console.log("Oppsberg Server is Up and Running on port:", PORT)
})