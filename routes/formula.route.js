import express from 'express';
const router = express.Router();
import { getFormulaBatch, postFlagTransfer } from '../controllers/Formula.js';

router.get('/:id', getFormulaBatch);
router.patch('/:id', postFlagTransfer);

export default router;
