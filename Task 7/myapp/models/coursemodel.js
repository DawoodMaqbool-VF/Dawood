const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({ //Schema for Database
    name: { //name should be of type string and can not be left blank.
        type: String,
        required: true
    },
    author: { //author should be of type string and can not be left blank. Moreover, its length should be in between 5-30 characters.
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    tags: [ String ], //tags should be of type string
    date: { type: Date, default: Date.now }, //date stamp is auto generated.
    isPublished: Boolean //isPublished should be of type Boolean.
});

module.exports = mongoose.model('Course', courseSchema);