const router = require('express').Router();
const { exec } = require('child_process');
const { writeFile, unlink } = require('fs').promises;

router.post('/runcode', async (req, res) => {
    const { code, lang } = req.body;

    if (lang !== 'java') {
        res.status(400).send('Unsupported language');
        return;
    }

    // Write the Java code to a temporary file
    const filename = `temp.java`;
    await writeFile(filename, code);

    // Compile and execute the Java code
    exec(`javac ${filename} && java ${filename.slice(0, -5)}`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            await unlink(filename); // Delete the temporary file
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        await unlink(filename); // Delete the temporary file
        res.send(stdout);
    });
});

module.exports = router;