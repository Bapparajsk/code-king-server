const router = require('express').Router();
const { auth } = require('../middleware/authentication');
const problemModel = require('../model/problem.schema');


//   --> /api/problem/get-all  -> return all problem database to client

router.get('/get-all', auth, async (req, res) => {
    try{
        const allProblems = await problemModel.find({});
        const problem = allProblems.map((item) => {
            return {
                number: item.number,
                hading: item.hading,
                difficulty: item.difficulty,
                totalSolver: item.totalSolver
            }
        })
        return res.status(200).json({
            type: 'successful',
            length: problem.length,
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