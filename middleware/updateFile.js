const updateFile = ({ hading, tagName, statement, example, difficulty, constraints }) => {
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

const validInputs = ( profileImage, useName, email, aboutMe, county, stPro, cursor ) => {
    const updateFields = {};

    if (profileImage) {
        updateFields.profile_image = profileImage;
    }
    if (useName) {
        updateFields.user_name = useName;
    }
    if (email) {
        updateFields.email = email;
    }
    if (aboutMe) {
        updateFields.about_me = aboutMe;
    }
    if (county) {
        updateFields.county = county;
    }
    if (stPro) {
        updateFields.student_professional = stPro;
    }
    if (cursor) {
        updateFields.cursor = cursor;
    }

    return updateFields;
}

module.exports = { updateFile, validInputs };