import express from 'express';
const router = express.Router();
import {
  getHeadersForm,
  createHeaderForm,
  getHeadersReport,
} from '../controllers/headersForm/index.js';

router.post('/', createHeaderForm);
router.get('/report/:date', getHeadersReport);
router.get('/:id/:date', getHeadersForm);
// router.patch('/:id', updateHeaderForm);
// router.get('/:date/:id', getShiftHeader);

export default router;
