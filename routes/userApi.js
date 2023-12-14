const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require ('../models/User');

// SIGNUP
router.post("/signup", async(req, res) => {
    try {
        // console.log(req.body);
        const password = req.body.password;
        if (!password || password.trim() === '') {
            return res.status(400).json({
                message: "Password is required",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Signup was successful!",
        });
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Signup failed!",
        });
    }
});

// LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if(user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if(isValidPassword) {
                // generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    } catch(err) {
        console.log(err)
        res.status(401).json({
            
            "error": "Authetication failed!"
        });
    }
});

module.exports = router;