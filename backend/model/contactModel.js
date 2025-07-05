const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    inquiryPurpose:{
        type: String,
        required: true,
        enum: [
            'General Question',
            'Feedback',
            'Partnership Request',
            'Technical Support',
            'Advertising Inquiry',
            'Report a Bug'
        ]
    },
    descriptionType: {
        type: String,
        required: true,
        enum:[
            'Individual',
            'Blogger',
            'Developer',
            'Business',
            'Organization',
            'Other'
        ]
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    organization:{
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contact',contactSchema);