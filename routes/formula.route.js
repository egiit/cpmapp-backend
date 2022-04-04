import express from 'express';

const router = express.Router();
import {
  // getAllFrmlBatchEnd,
  // getBatchChart,
  getFormulaBatch,
  // getSequenBatch,
  postFlagTransfer,
} from '../controllers/Formula.js';

router.get('/:id', getFormulaBatch);
// router.get('/report/:date', getAllFrmlBatchEnd);
// router.get('/chart/:date', getBatchChart);
// router.get('/sequence/:date', getSequenBatch);
router.patch('/:id', postFlagTransfer);

export default router;
