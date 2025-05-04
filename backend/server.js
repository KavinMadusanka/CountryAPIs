import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
// import session from 'express-session'; // You can uncomment if you use sessions

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Setup — Allow frontend hosted on Render
const allowedOrigins = [
  'http://localhost:5173',
  'https://countryapis-frontend.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Required for cookies or auth headers
}));

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
