import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // throw new BadRequestError("Please provide all values"); // Crahses Node
    res.status(400).json({ msg: "Please provide all values" });
    return;
  }
  const userAlreadyExists = await User.findOne({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    //throw new BadRequestError("Email already in use"); // Crashes node!
    res.status(409).json({ msg: "Email already in use" });
    return;
  }

  // Sequelize, create new user with UserSchema
  const user = await User.create({ name, email, password });

  // JWT creation
  const token = User.createJWT();

  // Hardcoding the user detail so the pass doesn't get sent clientside
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  });
};

// LOGIN //////////////////////////////////
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  // const user = await User.findOne({
  //   where: {
  //     email,
  //   },
  // });

  // if (!user) {
  //   throw new UnAuthenticatedError("Invalid Credentials");
  // }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const authenticated = await correctPassword(password, user.password);
    if (!authenticated) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    const token = User.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const correctPassword = (enteredPassword, originalPassword) => {
  return new Promise((resolve) => {
    bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
      resolve(res);
    });
  });
};

// UPDATE //////////////////////////////////
const updateUser = (req, res) => {
  console.log("update user");
};
/////////////////////////////////////////////
// Create User
const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    // find one to validate unique email address
    const currUser = await User.findOne({
      where: {
        email,
      },
    });
    if (currUser) {
      res.status(202).json({ msg: "User Already Exists!" });
    } else {
      const newUser = await User.create({ name, email, role });
      res.status(200).json({ newUser });
    }
  } catch (err) {
    console.log(err);
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  console.log("get all users");
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// GET SPECIFIC USER
const getUser = async (req, res) => {
  console.log("get specific user");
  const uuid = req.params.uuid;

  try {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong." });
  }
};

// UPDATE SPECIFIC USER
// const updateUser = async (req, res) => {
//   console.log("update user");
// };

// DELETE A USER
const deleteUser = async (req, res) => {
  console.log("delete user");

  const uuid = req.params.uuid;

  try {
    let deletedata = await User.destroy({
      where: {
        uuid,
      },
    });
    if (deletedata) {
      res.status(200).json({
        success: true,
        msg: "User Deleted Successfully",
        data: deletedata,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export { register, login, getUser, getAllUsers, deleteUser, updateUser };
