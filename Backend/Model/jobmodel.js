const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
   
    salary:String,
    description: String, 
    date: {
        type: Date,
        default: Date.now
    },
    email:String,
    


});

module.exports = mongoose.model('Job', jobSchema);
