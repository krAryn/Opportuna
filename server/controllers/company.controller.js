import Company from "../models/company.model.js"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import { generateToken } from "../utils/generateToken.js"
import Job from "../models/job.model.js"
import JobApplication from "../models/jobapplication.model.js"


// Register a company: /api/company/register
export const registerCompany = async (req, res) => {
    const {companyName, email, password} = req.body
    const logo = req.file

    if (!companyName || !email || !password || !logo) {
        return res.json({success: false, message: "Missing Details!"})
    }

    try {
        const companyExists = await Company.findOne({email})

        if (companyExists) {
            return res.json({success: false, message: "Company already Registered!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const image = await cloudinary.uploader.upload(logo.path, {resource_type: "image"})

        const company = await Company.create({
            name: companyName,
            email,
            password: hashedPassword,
            image: image.secure_url
        })

        const token = generateToken(company._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000
        })

        return res.json({
            success: true, 
            company: {
                id: company._id, 
                name: company.name, 
                email: company.email,
                image: company.image
            }
        })
 
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Company Login: /api/company/login
export const loginCompany = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.json({success: false, message: "Missing Details!"})
    }

    try {
        const company = await Company.findOne({email})

        if (!company) {
            return res.json({success: false, message: "Company Not Found!"})
        }

        const validPassword = await bcrypt.compare(password, company.password)

        if (validPassword) {

            const token = generateToken(company._id)

            res.cookie("token", token)
            return res.json({
                success: true,
                company: {
                    id: company._id, 
                    name: company.name, 
                    email: company.email,
                    image: company.image
                }
            })
        } else {
            return res.json({success: false, message: "Incorrect Password!"})
        }

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Company authorization: /api/company/is-auth
export const isAuth = async (req, res) => {

    try {
        const {id} = req.body;
        const company = await Company.findById(id)
        
        if (company) {
            return res.json({success: true, company: {
                id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            }})
        } else {
            return res.json({success: false, message: "Authorization Error!", id})
        }
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Get company data: /api/company/company-data
export const getCompanyData = async (req, res) => {
    const {id} = req.body

    try {
        const company = await Company.findById(id).select("-password")
        if (!company) {
            return res.json({success: false, message: "Company Not found"})
        }
    
        return res.json({success: true, company})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Post a new Job: /api/company/post-job
export const postJob = async (req, res) => {
    const { title, description, location, salary, level, category, id } = req.body
    if (!title || !description || !location || !salary || !id) {
        return res.json({success: false, message: "Missing Details!"})
    }

    try {
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            companyId: id,
            level,
            category,
            date: Date.now()
        })

        res.json({success: true, job})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Get Applicants list: /api/company/applicants
export const getCompanyApplicants = async (req, res) => {
    const {id} = req.body
    try {
        const applications = await JobApplication.find({companyId: id})
            .populate("userId", "name image resume")
            .populate("jobId", "title location category level salary")
    
            return res.json({success: true, applications})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }


}

// Get Company posted jobs: /api/company/list-jobs
export const getCompanyPostedJobs = async (req, res) => {

    try {
        const {id} = req.body
        const jobs = await Job.find({companyId: id})

        // Add no of applicants of the job
            // get no of JobApplications of a {job._id, id} set

        let jobsData = []

        for (let job of jobs) {
            const applications = await JobApplication.find({$and: [{jobId: job._id}, {companyId: id}]})
            jobsData.push({...job.toObject(), applicants: applications.length})
        }

        return res.json({success: true, jobsData})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Change applicants status: /api/company/change-status
export const changeApplicantStatus = async (req, res) => {
    try {
        const {applicantId, status} = req.body

        await JobApplication.findByIdAndUpdate(applicantId, {status})

        return res.json({success: true, message: "Status Changed"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Change job visiblity: /api/company/change-visiblity
export const changeJobVisiblity = async (req, res) => {
    try {
        const {jobId, id} = req.body

        const job = await Job.findById(jobId)

        if (id.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        return res.json({success: true, job})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Logout from company: /api/company/logout
export const logoutCompany = async (req, res) => {
    try {
        const {token} = req.cookies;

        if (!token) {
            return res.json({succcess: true, message: "Already Logged Out!"})
        }

        res.clearCookie("token", {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000
        })

        return res.json({success: true, message: "Logged Out"})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}