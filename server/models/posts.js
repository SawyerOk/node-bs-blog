const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title : {
        type : String,
        // required : true,
        minlength : 3,
        trim : true
    },
    text : {
        type : String,
        // required : true,
        minlength : 5,
        trim : true
    },
    createdAt : {
        type : Number,
        // required : true
    }
});

module.exports = {Post};