import express from 'express';
const router = express.Router();

import {
  getBatchFormVal,
  getBatchProduct,
  getFormingDataProd,
  getOneFormingDataProd,
  getProductForming,
  getReportBatchId,
  getReportBatchValue,
  getReportProductCheck,
  getReportProductId,
  postFormingDataBatch,
  postFormingDataProd,
} from '../controllers/Forming.js';

router.get('/product/:date', getProductForming);
router.get('/product/:date/:id/:headerId', getOneFormingDataProd);
router.get('/batch/:date', getBatchProduct);
router.get('/batch/form/:batchId', getBatchFormVal);
router.get('/product-check/:date', getFormingDataProd);

router.post('/product-check', postFormingDataProd);
router.post('/batch', postFormingDataBatch);

router.get('/report/batch-value/:date', getReportBatchValue);
router.get('/report/product-value/:date', getReportProductCheck);
router.get('/report/product/:date', getReportProductId);
router.get('/report/batch/:date', getReportBatchId);

export default router;
