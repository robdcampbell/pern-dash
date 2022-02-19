import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// prevent UUID and ID being sent in response.

class User extends Model {
  async comparePassword(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }

  static createJWT() {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_LIFETIME}`,
    });
  }
}

User.init(
  {
    // Model attributes are defined here
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
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user", // We need to choose the model name
  }
);

// https://sequelize.org/v6/manual/hooks.html

// RC - Hash Password using Sequelize beforeCreate()
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});

// RC - Compare password!

// HERE: http://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes

// Add JWT creation method to UserSchema

// Add password comparison method to UserSchema
/*

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

*/
// HERE HERE HERE

export default User;
