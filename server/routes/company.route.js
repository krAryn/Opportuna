import express from "express";
import { 
    changeApplicantStatus, 
    changeJobVisiblity, 
    getCompanyApplicants, 
    getCompanyData, 
    getCompanyPostedJobs, 
    isAuth, 
    loginCompany, 
    postJob, 
    registerCompany 
} from "../controllers/company.controller.js";
import { upload } from "../config/multer.config.js";
import { authCompany } from "../middlewares/company.auth.js";

const companyRouter = express.Router()


companyRouter.post("/register", upload.single("logo"), registerCompany)
companyRouter.post("/login", loginCompany)
companyRouter.get("/company", authCompany, getCompanyData)
companyRouter.post("/post-job", authCompany, postJob)
companyRouter.post("/applicants", authCompany, getCompanyApplicants)
companyRouter.get("/list-jobs", authCompany, getCompanyPostedJobs)
companyRouter.post("/change-status", authCompany, changeApplicantStatus)
companyRouter.post("/change-visiblity", authCompany, changeJobVisiblity)
companyRouter.post("/is-auth", authCompany, isAuth)

export default companyRouter