import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Analysis from "../models/Analysis.js";

/*
  @desc    Register a new user (Email + Password)
  @route   POST /api/auth/register
  @access  Public
*/
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, anonymousId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            provider: "local"
        });

        if (anonymousId) {
            await Analysis.updateMany(
                { ownerType: "anonymous", ownerId: anonymousId },
                {
                    ownerType: "user",
                    ownerId: user._id.toString()
                }
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

/*
  @desc    Login user with email and password
  @route   POST /api/auth/login
  @access  Public
*/
export const loginUser = async (req, res) => {
    try {
        const { email, password, anonymousId } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user || user.provider !== "local") {
            return res.status(400).json({
                success: false,
                message: "Username or password is wrong"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Username or password is wrong"
            });
        }

        if (anonymousId) {
            await Analysis.updateMany(
                { ownerType: "anonymous", ownerId: anonymousId },
                {
                    ownerType: "user",
                    ownerId: user._id.toString()
                }
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login Error", error)
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};