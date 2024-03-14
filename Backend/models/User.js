// Importing mongoose module
const mongoose = require('mongoose')

// Defining the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// Creating the user model
const User=mongoose.model('users',UserSchema)

// Creating indexes for the user model
User.createIndexes()

// Exporting the user model
module.exports = User;
