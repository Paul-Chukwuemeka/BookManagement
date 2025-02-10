import userSchema from "../models/user.schema.js"
import jwt from "jsonwebtoken"


const createToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{expiresIn:"1d"})
}


export const signup = async (req,res)=> {
    try{
        const {username,email,password} = req.body
        const user = await userSchema.signup(username,email,password)
        const jwt = createToken(user._id)
        res.status(200).json({user,jwt})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }

}
export const login = async (req,res)=> {
    try{
        const {email,password} = req.body
        const user = await userSchema.login(email,password)
        const jwt = createToken(user._id)
        res.status(200).json({user,message:"user logger in",jwt})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }

}

