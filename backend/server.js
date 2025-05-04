import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();  

// CORS configuration
const allowedOrigins = [
    'https://countryapis-frontend.onrender.com', // Production frontend URL
    'http://localhost:5173', // Development URL (for local testing)
];

app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,  // This is necessary if you're using cookies
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
