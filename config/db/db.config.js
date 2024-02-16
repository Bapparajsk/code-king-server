const mongoose = require('mongoose');

const init = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('🚀🚀 database connect successful');
    } catch (error) {
        console.log(' 😓😓 database connect unsuccessful :- ', error);
    }
}

init();