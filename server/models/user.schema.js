import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.statics.signup = async function(username,email,password){
    const findEmail = await this.findOne({email})

    if(findEmail){
        throw Error("email already exists")
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({username,email,password:hash})

    return user

}

userSchema.statics.login = async function(email,password){

  if (!email|| !password){
    throw Error("Email and Password required")
  }
  const user = await this.findOne({email})
  
  if(!user){
      throw Error("no user with this Email exists")
  }

  const comparePassword = await bcrypt.compare(password,user.password)

  if(!comparePassword){
    throw Error("incorrect Password")
  }


  return user
}


export default mongoose.model("User",userSchema)
