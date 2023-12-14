const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    }, 
    date:{
        type: Date,
        default: Date.now
    }
},
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post