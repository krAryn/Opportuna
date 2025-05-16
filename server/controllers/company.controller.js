import Company from "../models/company.model.js"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import { generateToken } from "../utils/generateToken.js"
import Job from "../models/job.model.js"


// Register a company: /api/company/register
export const registerCompany = async (req, res) => {
    const {name, email, password} = req.body
    const logo = req.file

    if (!name || !email || !password || !logo) {
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
            name,
            email,
            password: hashedPassword,
            image: image.secure_url
        })

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
 
    } catch (error) {
        console.log(error.message)
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
        console.log(email, " ", password)
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
            return res.json({success: false, message: "Incorrect Credentials!"})
        }

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Company authorization: /api/company/is-auth
export const isAuth = async (req, res) => {

    try {
        const {id} = req.body;
        // console.log(id)
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

}

// Get Company posted jobs: /api/company/list-jobs
export const getCompanyPostedJobs = async (req, res) => {

    try {
        const {id} = req.body
        const jobs = await Job.find({companyId: id})

        return res.json({success: true, jobs})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Change applicants status: /api/company/change-status
export const changeApplicantStatus = async (req, res) => {

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