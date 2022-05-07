import express from 'express';
import {
  getOneOvenBatchBridge,
  getOneOvenDataProd,
  getOvenBatchList,
  getOvenBatchVal,
  getOvenDataProd,
  getReportProductId,
  getRepOvenBatchList,
  getRepOvenBatchVal,
  postOvenBridgeBatch,
  postOvenDataBatch,
  postOvenDataProd,
  getRepProductInfo,
} from '../controllers/Oven.js';
const router = express.Router();

router.get('/product-check/:date', getOvenDataProd);
router.get('/product/:date/:id/:headerId', getOneOvenDataProd);
router.get('/batch/form/:id', getOvenBatchVal);
router.get('/batch-list/:date', getOvenBatchList);
router.get('/batch-bridge/:id', getOneOvenBatchBridge);

router.post('/product-check', postOvenDataProd);
router.post('/batch', postOvenDataBatch);
router.post('/batch-bridge', postOvenBridgeBatch);

router.get('/report/product/:date', getReportProductId);
router.get('/report/product-info/:date', getRepProductInfo);
router.get('/report/batch/form/:date', getRepOvenBatchVal);
router.get('/report/batch-list/:date', getRepOvenBatchList);

export default router;
