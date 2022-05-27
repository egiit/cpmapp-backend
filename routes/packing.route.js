import express from 'express';
import {
  getDataPackingReject,
  getDataProdHoldPacking,
  getDataProdPacking,
} from '../controllers/Packing.js';

const router = express.Router();

router.get('/dataproduksi/:date/:flag', getDataProdPacking);
router.get('/holdproduksi/:date', getDataProdHoldPacking);
router.get('/rejectproduksi/:date/:flag', getDataPackingReject);

export default router;
