import express from 'express';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import passport from 'passport';
// import session from 'express-session';
import cookieParser from 'cookie-parser';
import db from './config/database.js';
dotenv.config();
import cpmRoute from './routes/index.js';
import cors from 'cors';
import { UserAcc } from './models/userAcces.js';
// import catchAsync from './controllers/utils/catchAsync.js';
// import ExpressError from './controllers/utils/ExpressError.js';
// import morgan from 'morgan';
// import Users from './models/users.js';
// const sesionOptions = {
//   secret: 'ieuRahasia',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };

const PORT = 3001;
const app = express();

async () => {
  try {
    await db.authenticate();
    console.log('DB Connected');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
};

app.use(cors());
// var whitelist = [
//   'http://192.168.211.150:3000',
//   'http://localhost:3000',
//   'http://117.74.123.238/:3000',
// ];
// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   })
// );

app.use(cookieParser());
app.use(express.json());
// app.use(session(sesionOptions));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(Users.createStrategy());

// passport.serializeUser(Users.serializeUser());
// passport.deserializeUser(Users.deserializeUser());

app.use('/', cpmRoute);

// app.use((req, res) => {
//   res.json({ message: 'Something error' });
// });

app.listen(PORT, () => console.log(`Server Runing On port : ${PORT}`));
