const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/eval-api`);
        console.log('App connected to database')
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = dbConnection;