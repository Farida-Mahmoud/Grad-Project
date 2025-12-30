import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const {
        email,
      firstName,
      lastName,
      location,
      password,
      confirmPassword,
    } = req.body;

    // 1️⃣ Required fields
    if (
        !email||
      !firstName ||
      !lastName ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // email Validation
// 2️⃣ Email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Write a correct email format",
  });
}

// ✅ Check domain
const allowedDomains = ["example.com", "mydomain.org"]; // put allowed domains here
const emailDomain = email.split("@")[1]; // get the part after @

if (!allowedDomains.includes(emailDomain)) {
  return res.status(400).json({
    message: `Email domain must be one of: ${allowedDomains.join(", ")}`,
  });
}

    //  Name validation
    const nameRegex = /^[A-Za-z]{2,}$/;

    if (!nameRegex.test(firstName)) {
      return res.status(400).json({
        message: "First name must contain only letters and be at least 2 characters",
      });
    }

    if (!nameRegex.test(lastName)) {
      return res.status(400).json({
        message: "Last name must contain only letters and be at least 2 characters",
      });
    }

    // 3️⃣ Location validation
    if (location.length < 2) {
      return res.status(400).json({
        message: "Location must be at least 2 characters",
      });
    }

    // 4️⃣ Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, and a number",
      });
    }

    // 5️⃣ Confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // 6️⃣ Check if user already exists
    const existingUser = await User.findOne({ firstName, lastName });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8️⃣ Save user
    const newUser = new User({
      firstName,
      lastName,
      location,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
