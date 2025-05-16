import Job from "../models/job.model.js"


// Get all jobs: /api/jobs/list
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible:true }).populate("companyId", "-password")

        return res.json({success: true, jobs})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    // res.json({success: true})
}

// Get job by id: /api/jobs/:id
export const getJobById = async (req, res) => {

    try {
        
        const {id} = req.params
    
        const job = await Job.findById(id).populate("companyId", "-password")

        if (!job) {
            return res.json({success: false, message: "Job not Found"})
        }

        return res.json({success: true, job})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}