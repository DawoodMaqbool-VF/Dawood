const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

module.exports = mongoose.model('Bootcamp', bootcampSchema);
