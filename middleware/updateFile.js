const updateFile = ({  hading, tagName, statement, example, difficulty, constraints }) => {
    const updateFields = {};

    // Add properties to updateFields if they are present in the request body
    if (tagName) {
        updateFields.tagName = tagName;
    }
    if (hading) {
        updateFields.hading = hading;
    }
    if (statement) {
        updateFields.statement = statement;
    }
    if (example) {
        updateFields.example = example;
    }
    if (difficulty) {
        updateFields.difficulty = difficulty;
    }
    if (constraints) {
        updateFields.constraints = constraints;
    }

    return updateFields;
}

module.exports = { updateFile };