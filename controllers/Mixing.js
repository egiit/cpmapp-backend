import { Sequelize } from 'sequelize';

import db from '../config/database.js';
import {
  QueryGetProduct,
  QueryGetBatch,
  ProCheck,
  MixerProCheckDetail,
  QueryFormandValue,
} from '../models/mixer.model.js';

import { QueryTypes } from 'Sequelize'; //model user

// Ambil Product Mixer
export const getProductMixer = async (req, res) => {
  try {
    const products = await db.query(QueryGetProduct, {
      replacements: { plandate: req.params.date },
      type: QueryTypes.SELECT,
    });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Product Mixer' });
  }
};

// Ambil Batch Mixer
export const getBatchMixer = async (req, res) => {
  try {
    const batchs = await db.query(QueryGetBatch, {
      replacements: { plandate: req.params.date },
      type: QueryTypes.SELECT,
    });
    res.json(batchs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Get mixer_pro_check
export const getProCheck = async (req, res) => {
  try {
    const proChceck = await ProCheck.findAll({
      where: {
        header_id: req.params.headerId,
        batch_regis_id: req.params.regId,
      },
    });

    res.json(proChceck);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Create or Update mixer_pro_check
export const pushProCheck = async (req, res) => {
  try {
    const dataProCheck = req.body;

    const findItem = await ProCheck.findOne({
      where: {
        batch_regis_id: req.body.batch_regis_id,
        header_id: req.body.header_id,
      },
    });

    if (!findItem) {
      const proChceck = await ProCheck.create(dataProCheck);
      return res.json({ message: 'Data ProCheck Inputed', data: proChceck });
      // return res.json({ message: 'data tidak ada', data: findItem });
    }

    const proChceck = await ProCheck.update(dataProCheck, {
      where: {
        batch_regis_id: req.body.batch_regis_id,
        header_id: req.body.header_id,
      },
    });
    return res.json({ message: 'updated', data: findItem });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Create or Update mixer_pro_check_detail
export const postMixCheck = async (req, res) => {
  try {
    const data = req.body;

    const ifFound = await MixerProCheckDetail.findOne({
      where: {
        mixer_proc_check_id: req.body.mixer_proc_check_id,
        standar_form_id: req.body.standar_form_id,
      },
    });

    if (!ifFound) {
      const item = await MixerProCheckDetail.create(data);
      return res.json({ message: 'Data Mixer Check Inputed', data: item });
    }

    const item = await MixerProCheckDetail.update(data, {
      where: {
        mixer_proc_check_id: req.body.mixer_proc_check_id,
        standar_form_id: req.body.standar_form_id,
      },
    });

    return res.json({ message: 'Data Mixer Check Updated', data: item });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// Ambil form Mixer with value
export const getFormAndValue = async (req, res) => {
  try {
    const formValue = await db.query(QueryFormandValue, {
      replacements: {
        dept: req.params.dept,
        batchregisid: req.params.batchregisid,
      },
      type: QueryTypes.SELECT,
    });
    res.json(formValue);
  } catch (error) {
    res.json({ message: error.message });
  }
};
