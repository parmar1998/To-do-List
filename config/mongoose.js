
// import mongoose
const mongoose = require('mongoose');

// establish connection to Database
mongoose.connect('mongodb://0.0.0.0:27017/');
const db=mongoose.connection;

// if error give error
db.on('error',console.error.bind(console,'connection error'));

// if up and running print this
db.once('open',function(){
    console.log('Successfully connected to database')
})