import User from "../models/Users.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { EmailForgotPassword, EmailRegister } from "../helpers/generateEmail.js";

const signup = async (req, res) => {
  const { email } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist){
      const duplicated = new Error("This user already been registered");
      return res.status(404).json({ msg: duplicated.message })
    }
    const addNewUser = new User(req.body);
    addNewUser.token = generateId();
    await addNewUser.save();
    EmailRegister({
      email: addNewUser.email,
      name: addNewUser.name,
      token: addNewUser.token,
    });
    res.json({ msg: "We send you an email" })
  } catch (error) {
    console.log(error)
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const notExist = new Error ("User does not exist");
      return res.status(403).json({ msg: notExist.message })
    }
    if (await user.passworResult(password)){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user._id),
      });
    }else{
      const error = new Error("Incorrect Password");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error.message)
  }
} 

const authenticate = async (req, res) => {
  const { token } = req.params;
  try {
    const userAuthenticate = await User.findOne({ token });
    if (!userAuthenticate){
      const error = new Error("Invalid Token");
      return res.status(403).json({ msg: error.message })
    }
    userAuthenticate.result = true;
    userAuthenticate.token = "";
    await userAuthenticate.save();
    res.json({ msg: "User Authenticated" });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user){
      const error = new Error ("The user does not exist");
      return res.status(404).json({ msg: error.message });
    }
    user.token = generateId();
    await user.save();
    EmailForgotPassword({
      name: user.name,
      email:user.email,
      token:user.token,
    });
    res.json({ msg: "We have sent you an email with the instructions." })
  } catch (error) {
    console.log(error.message)
  }
}

const checkToken = async (req, res) => {
  const { token } = req.params;
  try {
    const validToken = await User.findOne({ token });
    if (validToken) {
      res.json({ msg: "Token is Valid and user exist" });
    }else{
      const error = new Error("Invalid Token");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error.message)
  }
}

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ token });
    if (user){
      user.password = password;
      user.token= "";
      await user.save();
      res.json({ msg: "The password was modificated." })
    }else{
      const error = new Error("Invalid Token.");
      return res.status(403).json({ msg: error.message })
    }
  } catch (error) {
    console.log(error.message);
  }
}

const profile = async (req, res) => {
  const { user } = req;
  res.json(user); 
}

export { signup, signin, authenticate, forgotPassword, checkToken, newPassword, profile };
