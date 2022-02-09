import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 25,
  message: "Too many requests from this IP. Please try again in 15 minutes.",
});

import authenticateUser from "../middleware/auth.js";

import { register, login, updateUser } from "../controllers/authController.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
