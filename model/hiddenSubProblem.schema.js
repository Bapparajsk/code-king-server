const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    problem_ID: {
        type: Types.ObjectId,
        require: true
    },
    sub_problem: {
        type: [],
        default: []
    }
})

const subProblemModel = model('subProblemInput', schema);

module.exports = subProblemModel;