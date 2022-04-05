import express from 'express';
const router = express.Router();

import { getProductForming } from '../controllers/Forming.js';

router.get('/product/:date', getProductForming);

export default router;
