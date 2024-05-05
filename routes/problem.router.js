const router = require('express').Router();
const { auth } = require('../middleware/authentication');
const problemModel = require('../model/problem.schema');


//   --> /api/problem/get-all  -> return all problem database to client

router.get('/get-all', auth, async (req, res) => {
    try{
        const allProblems = await problemModel.find({});
        const problem = { problemList: [], nameOfTotalProblem: { Easy: 0, Medium: 0, Hard: 0, }};

        for (let prob of allProblems) {
            const { number, hading, difficulty, totalSolver, tagName, _id } = prob;
            problem.problemList.push({
                id: _id,
                number: number,
                hading: hading,
                difficulty: difficulty,
                totalSolver: totalSolver,
                tagName: tagName,
            });

            const num = problem.nameOfTotalProblem[difficulty];
            problem.nameOfTotalProblem[difficulty] = num + 1;
        }

        return res.status(200).json({
            type: 'successful',
            problem
        });
    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
});

router.get('/get-one/:name', auth, async (req, res) => {
    try {
        const problemName = req.params.name;
        const problem = await problemModel.findOne({hading: problemName});
        if (!problem) {
            return res.status(400).json({
                type: 'error',
                massage: 'problem not found'
            });
        }

        return res.status(200).json({
            type: 'ok',
            massage: 'problem found',
            problem
        });
    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
})

module.exports = router;
