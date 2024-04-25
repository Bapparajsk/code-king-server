const router = require('express').Router();
const { getCode } = require('../lib/templates');
const {auth} = require("../middleware/authentication");
const axios = require('axios');
const subProblemModel = require('../model/hiddenSubProblem.schema');
const userDetailsModel = require('../model/userDetails.schema');
const problemModel = require('../model/problem.schema');
const { Types } = require('mongoose');

router.post('/run-code', auth, async (req, res) => {
    try {
        const { code, lang, userName, problemId } = req.body;

        if (!code || !lang || !userName || !problemId) {
            return res.status(400).json({
                type: 'error',
                massage: 'bad request'
            });
        }

        const user = req.user;
        const user_ID = new Types.ObjectId(user._id);
        const User = await userDetailsModel.findOne({user_ID});

        if (!User) {
            return res.status(400).json({
                type: 'error',
                massage: 'user not found!'
            })
        }

        const problem_ID = new Types.ObjectId(problemId);
        const currentProblemFindById = await subProblemModel.findOne({problem_ID});
        const currentProblem = await problemModel.findById(problemId);

        if (!currentProblemFindById) {
            return res.status(400).json({
                type: 'error',
                message: 'problem with problem id'
            })
        }

        const { sub_problem, sub_solution } = currentProblemFindById;

        const result = await axios.post(
            process.env.CODE_RUN_SERVER,
            {
                code: currentProblemFindById.code,
                lang: 'java',
                userName,
                userCode: code,
                subProblem: sub_problem,
                subSolution: sub_solution
            },
            {
                headers: {
                    'content-type': 'application/json',
                }
            }
        )

        const { problem_difficulty, problems_status } = User;
        const { difficulty } = currentProblem;
        const { Solved, Attempted } = problems_status;

        if (result.data.type === 'wrong') {
            await userDetailsModel.findOneAndUpdate(
                { user_ID },
                { $push: { [`problem_submissions_logs.${problemId}`]: 'wrong', }},
            );

            if (!Solved[problemId]) {
                Attempted[problemId] = true;
            }
        } else {
            await userDetailsModel.findOneAndUpdate(
                { user_ID },
                { $push: { [`problem_submissions_logs.${problemId}`]: 'success', }},
            );
            if (Attempted[problemId]) {
                delete Attempted[problemId];
            }

            if (!Solved[problemId]) {
                console.log("Solved[problemId]", Solved[problemId])
                if (difficulty === 'Easy') {
                    problem_difficulty.Easy++;
                } else if (difficulty === 'Medium') {
                    problem_difficulty.Medium++;
                } else {
                    problem_difficulty.Hard++;
                }

            }
            console.log("problemId", problemId)
            Solved[problemId] = true;
        }

        await User.updateOne({problems_status}, {$set: {Solved, Attempted}});

        await User.save();

        return res.json({
            type: "ok",
            massage: 'problem Submissions Successful',
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
});

module.exports = router;
