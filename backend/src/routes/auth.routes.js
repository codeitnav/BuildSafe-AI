import express from "express";
import {
    registerUser,
    loginUser,
    googleAuth
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/*
  @desc    Register a new user (Email + Password)
  @route   POST /api/auth/register
  @access  Public
*/
router.post("/register", registerUser);

/*
  @desc    Login user with email and password
  @route   POST /api/auth/login
  @access  Public
*/
router.post("/login", loginUser);

/*
  @desc    Authenticate or register user via Google OAuth
  @route   POST /api/auth/google
  @access  Public
*/
router.post("/google", googleAuth);

/*
  @desc    Get currently authenticated user profile
  @route   GET /api/auth/me
  @access  Private
*/
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

export default router;
