const router = require('express').Router();
const { Types } = require('mongoose');
const { adminAuth } = require('../middleware/authentication');
const { getCode } = require('../lib/templates.js');
const { margeCode, splitInput } = require("../lib/functions.js");
const subProblemModel = require('../model/hiddenSubProblem.schema');
const problemModel = require('../model/problem.schema');
const { post } = require("axios");

router.post('/', adminAuth, async (req, res) => {
    try {
        const { input, problem_ID, idx }  = req.body;

        const subProblem = await subProblemModel.findOne({problem_ID: new Types.ObjectId(problem_ID)});
        const problem = await problemModel.findById(problem_ID);

        const { code, main_code, sub_problem, sub_solution } = subProblem;
        const { problemDetails } = problem;
        const mainCode = getCode(margeCode(code, input).split('\n'), main_code);

        const codeData = await post(
            process.env.CODE_RUN_SERVER,
            {
                code: mainCode,
                lang: 'java',
                userName: 'admin'
            }
        )

        const {result} = codeData.data
        console.log(result);
        sub_problem[idx] = input;
        sub_solution[idx] = result.replace(/\n/g, '');

        await subProblemModel.findOneAndUpdate({problem_ID: new Types.ObjectId(problem_ID)}, {sub_problem, sub_solution});

        res.json({
            success: true,
            message: 'Code Add Successfully',
        })

    } catch (e) {
        console.log(e.response.data.error);
        res.status(500).json({
            success: false,
            message: 'Code generated Unsuccessfully',
            error: e
        })
    }
});

router.post('/code', adminAuth, async (req, res) => {
    try {
        const {problem_ID, code, mainCode } = req.body;
        const sub_problem = new Array(10);
        const sub_solution = new Array(10);
        const newSumProblem = new subProblemModel({problem_ID, main_code: mainCode, code, sub_problem, sub_solution});
        await newSumProblem.save();

        res.json({
            success: true,
            message: 'Code Add Successfully',
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Code generated Unsuccessfully',
        })
    }
});

module.exports = router;
