import User from '../models/user.model.js'
import bycrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js';
export const signUp = async (req, res) => {
    try {
        const fullName = req.body.fullName;
        const userName = req.body.userName;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const gender = req.body.gender;
        // cheaking if the  password and confirm password is same or not
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password and Confirm Password does not match." });
        }

        // cheking if the password length is greather than 6 or not
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." })
        }
        // cheking if the username is already exists on db or not
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }

        // hashing the user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        // configure the usere profile pic using the following API
        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        // creating the model
        const newUser = new User({
            fullName: fullName,
            userName: userName,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            // generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            // saving the model to the db
            await newUser.save()
            // sending response when user created
            res.status(201).json({
                message: "User created successfully.",
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }
    } catch (error) {
        console.log("error in signUp controller", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}

export const logIn = async (req, res) => {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        // cheking if the username is already exists on db or not
        const user = await User.findOne({ userName })
        //  comparing the password with the actual db password
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || "")
        
        // cheaking if the both field are availble in db or not
        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ error: "username or password is  incorrect!",}
            )
        }
        generateTokenAndSetCookie(user._id, res)
        // setting cookie
        res.status(200).json({
            message: "user logged in successfully",
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log(error)
    }
}
export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "user logged out successfully"
        })
    } catch (error) {
        console.log('error in logOut controller', error)
        res.status(500).json({
            message: "internal server error"

        })
    }
}
