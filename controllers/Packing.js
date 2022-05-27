import { QueryTypes } from 'sequelize';
import db from '../config/database.js';
import {
  QueryGetPackingHold,
  QueryGetPackingReject,
  QureryGetPackingProd,
} from '../models/packing.model.js';

//data hasil produksi packing
export const getDataProdPacking = async (req, res) => {
  try {
    const allData = await db.query(QureryGetPackingProd, {
      replacements: {
        date: req.params.date,
        flag: req.params.flag,
      },
      type: QueryTypes.SELECT,
    });

    res.json(allData);
  } catch (error) {
    res.json({ message: 'Data Tidak Packing Produksi Ditemukan', error });
  }
};

//data hasil Hold packing
export const getDataProdHoldPacking = async (req, res) => {
  try {
    const allData = await db.query(QueryGetPackingHold, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    res.json(allData);
  } catch (error) {
    res.json({ message: 'Data Tidak Hold Packing Ditemukan', error });
  }
};

//data hasil Hold packing
export const getDataPackingReject = async (req, res) => {
  try {
    const allData = await db.query(QueryGetPackingReject, {
      replacements: {
        date: req.params.date,
        flag: req.params.flag,
      },
      type: QueryTypes.SELECT,
    });

    res.json(allData);
  } catch (error) {
    res.json({ message: 'Data Tidak Reject Packing Ditemukan', error });
  }
};
