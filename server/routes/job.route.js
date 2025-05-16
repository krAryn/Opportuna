import express from "express";
import { getJobById, getJobs } from "../controllers/job.controller.js";

const jobRouter = express.Router()

// Get all jobs: /api/jobs/list
jobRouter.get("/list", getJobs)

// Get job by id: /api/jobs/:id
jobRouter.get("/:id", getJobById)

export default jobRouter;