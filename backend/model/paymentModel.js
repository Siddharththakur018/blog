const mongoose = require('mongoose');
const User = require('../model/userModel')

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    cardNumber:{
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    cvv:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['success', 'failed']
    },
    role: {
        type: String,
        enum: ['normal', 'medium', 'premium'], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Payment', paymentSchema);