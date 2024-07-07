const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

/*
    Process for Signup:-
    1. Existing User Check
    2. Hashed Password
    3. User Creation
    4. Token Generate
*/
const signup = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const existingUser = await userModel.findOne({ email: email })

        if( existingUser ) {
            return req.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)
        res.status(201).json({user: result, token: token})
    } catch (error) {
        console.log(`Signup exception: ${error}`);
        res.status(500).json({message: "User not able to sign up"})
    }
}

/*
    1. User exists? then sign in
    2. Credentials match - password compare
    3. Sign in process - token generation
*/
const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await userModel.findOne({email: email})
        if (!existingUser) {
            return res.status(404).json({message: "User not found"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if( !matchPassword ) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY)
        res.status(200).json({user: existingUser, token: token})

    } catch (error) {
        console.log(`Signin exception: ${error}`);
        res.status(500).json({message: "User not able to sign in"})
    }

}

module.exports = { signup, signin }