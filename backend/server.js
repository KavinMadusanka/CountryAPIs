import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
// import session from 'express-session'; // You can uncomment if you use sessions

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();  

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);

// Default route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Country REST API"
  });
});

// Port
const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
