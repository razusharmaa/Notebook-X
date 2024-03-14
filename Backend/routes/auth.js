// Importing required modules
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchuser  = require('../Middleware/fetchuser');

const JWT_Secreat="Itsnotstrongpsk"

//Route 1 "" Route for user registration
router.post('/register', [
  // Validation rules
  body('name','Enter a valid name').isLength({ min: 3 }),
  body('email','Enter a valid email').isEmail(),
  body('password').isLength({ min: 8 }),
], async (req, res) => {
  // Checking validation results
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Creating a new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    // Saving the user to the database
    const savedUser = await newUser.save()
    const data1={
      user:{
        id:savedUser.id
      }
    }
    const authToken = jwt.sign(data1, JWT_Secreat);
    res.json({authToken})

  } catch (err) {
    // Handling errors
    if (err.code === 11000) {
        res.status(400).json({error: "A user with this email already exists"});
    } else {
        res.status(500).json({error: "An error occurred while creating the user"});
    }
  }
})

// Route 2: Authentication & Route for user LOGIN
router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password',"Password can't be blank ").exists(),
], async (req, res) => {
  // Checking validation results
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {email, password}=req.body
  try{
    let UserLogin = await User.findOne({email})
    if(!UserLogin) {
      return res.status(400).json({"error":"Sorry the user does not exist"})
    }
    const PasswordCompare = await bcrypt.compare(password, UserLogin.password)
    if(!PasswordCompare) {
      return res.status(401).json({"error":"Sorry the password isn't correct"})
    }

    const data1={
      user:{
        id:UserLogin.id
      }
    }
    const authToken = jwt.sign(data1, JWT_Secreat);
    res.json({authToken})

  } catch(error) {
    console.log(error)
    res.status(400).json({error: error});
  }
})

// Route 3 : Get LoginIn user details using: Post "/api/auth/getuser" , Login require
router.post('/getuser',fetchuser, async (req, res) => {

try {
  const userId=req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.log(error)
  res.status(400).json({error: error});
}
})

module.exports = router
