import { QueryTypes } from 'sequelize';

import db from '../config/database.js';
import { QryGetProdForming } from '../models/formingBatch.model.js';

export const getProductForming = async (req, res) => {
  try {
    const products = await db.query(QryGetProdForming, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Product Forming' });
  }
};
