import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    default: "my city",
  },
});

// Middlware - HashPass
UserSchema.pre("save", async function () {
  // console.log(this.password)
  //// returns value that are being modified during save/update PATCHes
  //console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Add JWT creation method to UserSchema
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_LIFETIME}`,
  });
};
// Add password comparison method to UserSchema
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
