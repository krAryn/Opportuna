import express from "express"
import { verifyWebhook } from "@clerk/express/webhooks"
import User from "../models/user.model.js"

const webhookRouter = express.Router()

webhookRouter.post("/clerk",  express.raw({ type: 'application/json' }), async (req, res) => {

    try {
        const {data, type} = await verifyWebhook(req)

        if (type === "user.created") {
            await User.create({
                _id: data.id, 
                name: `${data.first_name} ${data.last_name}`, 
                email: data.email_addresses[0].email_address, 
                resume: "", 
                image: data.image_url
            })

        } else if (type === "user.updated") {
            await User.findByIdAndUpdate(data.id, {
                name: `${data.first_name} ${data.last_name}`, 
                email: data.email_addresses[0].email_address, 
                image: data.image_url
            })
        } else {
            await User.findByIdAndDelete(data.id)
        }
        
        return res.json({success: true, message: `${type} event occured`})
    } catch (error) {
        console.log("Webhook Error: ", error.message)
        return res.json({success: false, message: "Webhook error!"})
    }
})

export default webhookRouter