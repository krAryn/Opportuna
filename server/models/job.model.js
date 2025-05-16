import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    category: {type: String, required: true},
    level: {type: String, required: true},
    salary: {type: Number, required: true},
    date: {type: Number, required: true},
    visible: {type: Boolean, default: true},
    companyId: {type: String, required: true, ref: "company"},
})

const Job = mongoose.models.job || mongoose.model("job", jobSchema)

export default Job