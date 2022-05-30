import express from 'express';
import {
  getChartBatch,
  getDashActualBatch,
  getDashDataChart,
  getPlanFg,
  getProdDetailTime,
  getProdFG,
  getProdTimeChart,
  getRejectPerBatch,
  getRejectTotal,
} from '../controllers/Dashboard.js';
const router = express.Router();

router.get('/actualbatch/:date', getDashActualBatch);
router.get('/chartBatch/:date', getChartBatch);
router.get('/planFG/:date', getPlanFg);
router.get('/chartFG/:date/:flag', getDashDataChart);
router.get('/prodFG/:date/:flag', getProdFG);
router.get('/totReject/:date', getRejectTotal);
router.get('/rejectPerBatch/:date', getRejectPerBatch);
router.get('/ProdTime/:date', getProdDetailTime);
router.get('/chartProdTime/:date', getProdTimeChart);

export default router;
