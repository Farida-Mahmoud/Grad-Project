import express from "express";
import User from "../models/User";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Step 1: Register email & send verification code
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user = new User({ email, verificationCode });
    await user.save();

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification Code",
      text: `Your code is ${verificationCode}`,
    });

    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Step 2: Verify code
router.post("/verify", async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ message: "Verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
