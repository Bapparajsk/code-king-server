const router = require('express').Router();
const { auth } = require('../middleware/authentication');
const problemModel = require('../model/problem.schema');


//   --> /api/problem/get-all  -> return all problem database to client

router.get('/get-all', auth, async (req, res) => {
    try{
        const problems = await problemModel.find({});
        return res.status(200).json({
            type: 'successful',
            data : {
                length: problems.length,
                problems
            }
        });
    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
});

module.exports = router;