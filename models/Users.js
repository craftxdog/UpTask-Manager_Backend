import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
  },
  result: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true, 
  }

);

userSchema.pre("save", async function (next){
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.passworResult = async function (passwordForm) {
  return bcrypt.compareSync(passwordForm, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
