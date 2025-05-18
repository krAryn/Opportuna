import express from "express";
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from "../controllers/user.controller.js";
import { upload } from "../config/multer.config.js";

const userRouter = express.Router()

userRouter.post("/user", getUserData)
userRouter.post("/apply", applyForJob)
userRouter.get("/applications", getUserJobApplications)
userRouter.post("/update-resume", upload.single("resume"), updateUserResume)

export default userRouter;