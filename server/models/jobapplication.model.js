import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId: {type: String, ref: "user", required: true},
    companyId: {type: String, ref: "company", required: true},
    jobId: {type: String, ref: "job", required: true},
    status: {type: String, default: "Pending"},
    data: {type: Number, required: true}
})

const JobApplication = mongoose.models.jobApplication || mongoose.model("jobApplication", jobApplicationSchema)

export default JobApplication