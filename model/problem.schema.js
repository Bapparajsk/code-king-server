const { Schema, model } = require('mongoose');

const schema = new Schema({
    number : {
        type: Number,
        require: true,
        unique: true,
    },
    hading : {
        type: String,
        require: true,
        unique: true,
    },
    statement : {
        type: [],
        require: true
    },
    example : {
        type: [],
        require: true
    },
    constraints : {
        type: [],
        require: true,
    },
    tagName: {
        type: [],
        require: true
    },
    difficulty : {
        type: String,
        require: true
    },
    totalSolver: {
        type: String,
        default: 0
    }
});

const problemModel = model( 'problem', schema );

module.exports = problemModel;