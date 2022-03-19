import express from 'express';
const router = express.Router();
import {
  getProductMixer,
  getBatchMixer,
  getProCheck,
  pushProCheck,
  postMixCheck,
  getFormAndValue,
} from '../controllers/Mixing.js';

router.get('/product/:date', getProductMixer);
router.get('/batch/:date', getBatchMixer);
router.get('/batch/procheck/:headerId/:regId', getProCheck);
router.get('/batch/:dept/:batchregisid', getFormAndValue);
router.post('/batch/procheck', pushProCheck);
router.post('/batch/checklist', postMixCheck);

export default router;
