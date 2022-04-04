import express from 'express';
const router = express.Router();
import {
  getProductMixer,
  getBatchMixer,
  getProCheck,
  pushProCheck,
  postMixCheck,
  getFormAndValue,
  getMixFrmlCheck,
  postMixFrmlCheck,
  getMixFrmlparams,
  getMixFrmlvalue,
  pushMixFrmlVal,
  getAllFrmlBatchEnd,
  getBatchChart,
  getSequenBatch,
  getTimeProccess,
  getMixMasterValue,
  // getMixFrmlWithValue,
} from '../controllers/Mixing.js';

router.get('/product/:date', getProductMixer);
router.get('/batch/:date', getBatchMixer);
router.get('/batch/procheck/:headerId/:regId', getProCheck);
router.get('/batch/:dept/:batchregisid', getFormAndValue);
router.post('/batch/procheck', pushProCheck);
router.post('/batch/checklist', postMixCheck);
router.get('/frmla-params', getMixFrmlCheck);
router.get('/frmla-params/:headerId/:productId', getMixFrmlparams);
router.get('/frmla-params/value/:headerId/:productId', getMixFrmlvalue);
router.post('/frmla-params', postMixFrmlCheck);
router.post('/frmla-params/value', pushMixFrmlVal);

router.get('/report/:date/:shiftId/:productId', getAllFrmlBatchEnd);
router.get('/report/master/:date', getMixMasterValue);
router.get('/report/product/:date/:shiftId/:productId', getBatchChart);
router.get('/report/sequence/:date/:shiftId/:productId', getSequenBatch);
router.get('/report/time/:btchregid/:start/:finish', getTimeProccess);

export default router;
