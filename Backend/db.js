// Importing mongoose module
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURL= "mongodb://localhost:27017/userdata"

// Function to connect to MongoDB
const connect2mango =()=>{
    // Connecting to MongoDB
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    // Handling connection errors
    db.on('error', console.error.bind(console, 'connection error:'));

    // Once the connection is open, we log a success message
    db.once('open', function() {
        console.log("Connected to MongoDB successfully!");
    });
}

module.exports = connect2mango;
