const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/EmployeeReviewSystem_Developer');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connection to MongoDB'));

db.once('open', function(){
    console.log('connected to Database :: MongoDB');
})

module.exports = db;