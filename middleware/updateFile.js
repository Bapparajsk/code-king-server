const updateFile = ({ number, hading, statement, example, constraints }) => {
    const updateFields = {};

    // Add properties to updateFields if they are present in the request body
    if (number) {
        updateFields.number = number;
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
    if (constraints) {
        updateFields.constraints = constraints;
    }

    return updateFields;
}

module.exports = { updateFile };