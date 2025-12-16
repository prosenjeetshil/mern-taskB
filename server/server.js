const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

//env config
dotenv.config();

//DB config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes

app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/todo', require('./routes/todoRoute'));

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgCyan);
})

