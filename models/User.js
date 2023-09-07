const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        unique : true
    },
    number: {
        type: Number,
        require:true,
        unique:true
    }
})