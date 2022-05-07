import express from 'express';
import getDashboard from '../controllers/Dashboard.js';
import userRoute from './user.route.js';
import userAccesRoute from './userAccess.route.js';
import { getDept, getDeptById } from '../controllers/setup/Dept.js';
import getMenu from '../controllers/setup/Menu.js';
import { Login, Logout } from '../controllers/auth/Login.js';
import headerRoute from './headerFrom.route.js';
import mixerRoute from './mixer.route.js';
import formulaRoute from './formula.route.js';
import downtimeRoute from './downtime.route.js';
import formingRoute from './forming.route.js';
import ovenRoute from './oven.route.js';

// import catchAsync from '../controllers/utils/catchAsync.js';
import ExpressError from '../controllers/utils/ExpressError.js';

import { refreshToken } from '../controllers/auth/RefreshToken.js';
import { getForm } from '../controllers/utils/formStandar.js';

const router = express.Router();

router.get('/', getDashboard);
router.use('/user', userRoute);
router.get('/dept', getDept);
router.get('/dept/:id', getDeptById);
router.get('/menu', getMenu);
router.use('/useraccess', userAccesRoute);
router.post('/login', Login);
router.get('/token', refreshToken);
router.use('/header', headerRoute);
router.use('/mixer', mixerRoute);
router.use('/formula', formulaRoute);
router.use('/forming', formingRoute);
router.use('/oven', ovenRoute);
router.use('/downtime', downtimeRoute);
router.get('/getform/:dept', getForm);
router.delete('/logout', Logout);

router.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 400));
});

router.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something Wrong!!';
  res.status(statusCode).json({ message: err });
});

export default router;
