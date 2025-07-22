const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltFactor = 10;
const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');
const { protect, adminOnly } = require('../middleware/authMiddleware')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter all required fields" })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltFactor);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save();
    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Created Successfully", user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role !== 'admin') {
      return res.status(401).json({ message: "Role must be admin" })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltFactor);
    const newAdmin = await User.create({ name, email, password: hashedPassword, role });

    await newAdmin.save();

    res.status(201).json({ messsage: "Admin Created" })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    rres.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful", token, user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = { registerUser, createAdmin, loginUser };