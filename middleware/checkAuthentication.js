import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const checkAuthentication = async (req, res, next) => {

  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ msg: 'Authorization header missing or invalid' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id).select("-password -result -token -createdAt -updatedAt -__v");
    next();
   } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
export default checkAuthentication;
