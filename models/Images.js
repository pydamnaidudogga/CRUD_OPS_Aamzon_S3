const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    key: {
        type: String,
        unique:true
    },
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})


const Images = mongoose.model('Images', imageSchema);

module.exports = Images;