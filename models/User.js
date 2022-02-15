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

export default User;
