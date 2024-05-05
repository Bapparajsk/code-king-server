const { Schema, model, Types } = require('mongoose');
const fs = require('fs').promises; // Importing fs promises API
const path = require('path');

const difficultyName = {
    Easy: Number,
    Medium: Number,
    Hard: Number,
};

const languageName = {
    java: Number,
    python: Number,
    cpp: Number,
    c: Number,
    javaScript: Number,
};

// Async function to read default profile image
const defaultProfileImage = async () => {
    try {
        // Provide the correct path to your default profile image
        const imagePath = path.join(__dirname, '../images/profileDefault.jpg');
        const data = await fs.readFile(imagePath);
        return {
            data: data
        };
    } catch (error) {
        console.error('Error reading default profile image:', error);
        throw error;
    }
};

// Define your schema
const schema = new Schema({
    user_ID: {
        type: Types.ObjectId,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    profile_image: {
        data: Buffer,
        contentType: String,
        default: { data: Buffer.alloc(0) },
    },
    county: {
        type: String,
        default: ''
    },
    about_me: {
        type: String,
        default: ''
    },
    student_professional: {
        type: String,
        default: ''
    },
    problem_difficulty: {
        type: difficultyName,
        required: true,
        default: { Easy: 0, Medium: 0, Hard: 0 }
    },
    language: {
        type: languageName,
        default: { java: 0, python: 0, cpp: 0, c: 0, javaScript: 0 }
    },
    cursor: {
        type: Boolean,
        default: true
    },
    problems_status: {
        type: {},
    },
    problem_submissions_logs: {
        type: {},
        default: {},
    },
    user_submissions_logs: {
        type: [],
        default: [],
    }
});

// Set the default profile image asynchronously in the model constructor
schema.pre('save', async function (next) {
    if (!this.profile_image.data || !this.profile_image.data.length) {
        try {
            this.profile_image = await defaultProfileImage();
        } catch (error) {
            console.error('Error setting default profile image:', error);
        }
    }
    next();
});

const userDetailsModel = model('userDetail', schema);

module.exports = userDetailsModel;
