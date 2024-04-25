const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    problem_ID: {
        type: Types.ObjectId,
        require: true
    },
    main_code: {
        type: String,
    },
    code: {
        type: String,
        require: true
    },
    sub_problem: {
        type: [],
        default: []
    },
    sub_solution: {
        type: [],
        default: []
    }
})

const subProblemModel = model('subProblemInput', schema);

module.exports = subProblemModel;