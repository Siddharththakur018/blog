const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    role:{
        type: String,
        enum:['admin', 'normal','medium','premium'],
        default: 'normal'
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    level:{
        type: Number,
        default: 1
    }
},{timestamps: true})


module.exports = mongoose.model('User', userSchema);