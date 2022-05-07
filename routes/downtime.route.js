import express from 'express';
const router = express.Router();
import {
  getDowntime,
  postDowntime,
  deleteDowntime,
  getDowntimeReport,
} from '../controllers/utils/downTime.js';

router.get('/:headerId', getDowntime);
router.get('/report/:date/:deptId', getDowntimeReport);

router.delete('/:id', deleteDowntime);
router.post('/', postDowntime);

export default router;
