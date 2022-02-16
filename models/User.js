import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// prevent UUID and ID being sent in response.

const User = sequelize.define(
  "users",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    role: {
      type: Sequelize.STRING,
      default: "standard",
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// HERE: http://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes

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

export default User;
