// Importing required modules
const connect2mango = require('./db');
const express = require('express')

// Creating an express app
const app = express()
const port = 5000

// Middleware to parse JSON bodies
app.use(express.json())

// Defining routes for authentication and notes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

// Starting the server and connecting to MongoDB
app.listen(port, () => {
  console.log(`NotebooX app Backend listening on port ${port}`)
  connect2mango();
})
