import express from 'express';
const router = express.Router();
import {
  getHeadersForm,
  createHeaderForm,
  updateHeaderForm,
} from '../controllers/headersForm/index.js';

router.get('/:id/:date', getHeadersForm);
router.post('/', createHeaderForm);
router.patch('/:id', updateHeaderForm);
// router.get('/:date/:id', getShiftHeader);

export default router;
