import db from '../config/database.js';

import FormulaBatch from '../models/frmlaBatch.model.js';

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
