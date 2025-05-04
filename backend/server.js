import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import session from 'express-session';

dotenv.config();

connectDB();
const app = express();

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET, // Replace with your secret key
//         resave: false, // Prevents resaving session if nothing changed
//         saveUninitialized: false, // Prevents saving empty sessions
//         cookie: {
//             httpOnly: true, // Ensures cookie is only accessible via HTTP(S)
//             secure: false, // Set to true for production (requires HTTPS)
//             maxAge: 1000 * 60 * 60 * 24, // Session expiry time (1 day)
//         },
//     })
// );

app.use(cors({
    origin: 'https://countryapis-frontend.onrender.com',
    // methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(cors());

//routes
app.use('/api/v1/auth',authRouter);

app.get("/", (req, res) => {
    res.send({
        message: "welcome to Country REST API"
    })
})

//port
const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});