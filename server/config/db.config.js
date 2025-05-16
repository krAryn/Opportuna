import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI)
    console.log("Database connected")
}

export default connectDB