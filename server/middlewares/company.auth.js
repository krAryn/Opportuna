import jwt from "jsonwebtoken"

export const authCompany = (req, res, next) => {

    try {
        const {token} = req.cookies;
        if (!token) {
            return res.json({success: false, message: "Token not found!"})
        }

        const {id} = jwt.verify(token, process.env.JWT_SECRET)
    
        req.body.id = id;
        next()
    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}