import db from '../config/database.js';
import { QueryTypes } from 'sequelize';

import {
  FormulaBatch,
  // QueryFrmlBatchChart,
} from '../models/frmlaBatch.model.js';
// import { QueryGetProduct } from '../models/mixer.model.js';

//original formula batch sesuai table
export const getFormulaBatch = async (req, res) => {
  try {
    const batchFormula = await FormulaBatch.findAll({
      where: { batch_regis_id: req.params.id },
    });
    return res.json(batchFormula[0]);
  } catch (error) {
    res.json({ message: 'Data Tidak Ditemukan', error });
  }
};

//push flag transfer
export const postFlagTransfer = async (req, res) => {
  try {
    const data = req.body;
    await FormulaBatch.update(data, {
      where: { batch_regis_id: req.params.id },
    });
    res.json({ message: 'Data Update' });
  } catch (error) {
    res.json({ message: 'error update', error: error.message });
  }
};
