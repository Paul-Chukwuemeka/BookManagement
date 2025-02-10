import jwt from "jsonwebtoken";
import userSchema from "../models/user.schema.js";

const auth = async (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization;
    if (!authorization) {
      return res
        .status(401)
        .json({ message: "token required" });
    }
    console.log(authorization)
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(
      token,
      process.env.SECRET
    );
    const user = await userSchema.findById( id );
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized" });
    }
    req.id = id;
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message });
  }
  next();
};
export default auth;
