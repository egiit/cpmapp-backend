import express from 'express';
const router = express.Router();
import {
  getDowntime,
  postDowntime,
  deleteDowntime,
} from '../controllers/utils/downTime.js';

router.get('/:headerId', getDowntime);
router.delete('/:id', deleteDowntime);
router.post('/', postDowntime);

export default router;
