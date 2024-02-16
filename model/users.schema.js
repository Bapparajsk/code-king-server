const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName: {
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
    }
});

const useModel = model('usesSing', schema);

module.exports = useModel;