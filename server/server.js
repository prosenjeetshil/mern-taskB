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
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://taskb.vercel.app"
    ],
    credentials: true
  })
);
app.use(morgan('dev'));

//health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API is running",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.get("/health/db", (req, res) => {
  const dbState = mongoose.connection.readyState;

  /*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
  */

  if (dbState === 1) {
    return res.status(200).json({
      status: "ok",
      database: "connected",
    });
  }

  return res.status(500).json({
    status: "error",
    database: "not connected",
    state: dbState,
  });
});

//routes
app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/todo', require('./routes/todoRoute'));

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgCyan);
})

