import express from 'express';
import {
  getChartBatch,
  getDashActualBatch,
  getDashDataChart,
  getPlanFg,
  getProdFG,
  getRejectTotal,
} from '../controllers/Dashboard.js';
const router = express.Router();

router.get('/actualbatch/:date', getDashActualBatch);
router.get('/chartBatch/:date', getChartBatch);
router.get('/planFG/:date', getPlanFg);
router.get('/chartFG/:date/:flag', getDashDataChart);
router.get('/prodFG/:date/:flag', getProdFG);
router.get('/totReject/:date', getRejectTotal);

export default router;
