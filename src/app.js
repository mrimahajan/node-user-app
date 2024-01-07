import express from 'express';
import cors from 'cors';
import { handleLogging } from './middlewares/log.js';
import homeRouter from './routes/home.js';
import userRouter from './routes/userRouter.js';
import fileUploadRouter from './routes/uploadFile.js';
import route from './routes/route.json' assert { type: 'json' };
import status from 'express-status-monitor';
import session from 'express-session';
import { verifyJWT } from './middlewares/verifyJWT.js';
import cookieParser from 'cookie-parser';

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', 'src/views');

// Middlewares
app.use(
  cors({
    origin: process.env.SITE_ORIGIN,
  })
);
app.use(status());
app.use(express.static('public'));
// Middleware to parse URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// attaching the middleware
app.use(handleLogging);

// express session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     // resave: false,
//     // cookie: { secure: true },
//   })
// );

app.use(verifyJWT);

// Attach the routes
app.use(homeRouter);
app.use(route.API_USER, userRouter);
app.use(route.UPLOAD, fileUploadRouter);

export default app;
