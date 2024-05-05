const { Schema, model, Types } = require('mongoose');
const mongoose = require("mongoose");

const schema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sessionToken: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    }
});

schema.pre('save', function (next) {
    const user = this;
    // Check if OTP is set and the document is new or modified
    if (user.otp && (user.isNew || user.isModified('otp'))) {
        setTimeout(() => {
            user.otp = undefined; // Remove OTP after 10 minutes
            user.save(); // Save changes
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
    }
    next();
});


const verifyUser = mongoose.model('verifyUser', schema);

module.exports = verifyUser;
