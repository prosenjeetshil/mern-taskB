const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen);
    } catch (error) {
        console.log('Error in DB connection', error);
    }
}

module.exports = connectDB;