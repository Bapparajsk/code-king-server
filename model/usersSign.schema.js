const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_name: {
        type: String,
        require: true,
        minLength: 5
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const userModel = model('usesSing', schema);

module.exports = userModel;