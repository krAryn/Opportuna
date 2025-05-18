import Job from "../models/job.model.js"
import JobApplication from "../models/jobapplication.model.js"
import User from "../models/user.model.js"
import {v2 as cloudinary} from "cloudinary"

// Get user Data: /api/user/user
export const getUserData = async(req, res) => {
    const {userId} = req.body

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }

        return res.json({success: true, user})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Apply for a Job: /api/uesr/apply
export const applyForJob = async(req, res) => {
    const {userId, jobId} = req.body

    try {
        const isAlreadyApplied = await JobApplication.find({$and: [{jobId}, {userId}]})
        if (isAlreadyApplied.length > 0) {
            return res.json({success: false, message: "Already Applied"})
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({success: false, message: "Job Not Found"})
        }

        const newApplication = await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            data: Date.now()
        })

        return res.json({success: true, newApplication})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get user applications: /api/user/applications
export const getUserJobApplications = async (req, res) => {
    try {
        const {userid} = req.headers

        const applications = await JobApplication.find({userId: userid})
        .populate("companyId", "name email image")
        .populate("jobId", "title description location category level salary")
        // .exec()

        if (!applications) {
            return res.json({success: false, message: "No Job Applications found!"})
        }

        return res.json({success: true, applications})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// update user resume: /api/user/update-resume
export const updateUserResume = async (req, res) => {
    try {
        const {userId} = req.body;
        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resume = await cloudinary.uploader.upload(resumeFile.path, {resource_type: "auto"})
            userData.resume = resume.secure_url
        }

        await userData.save()

        return res.json({success: true, userData})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}