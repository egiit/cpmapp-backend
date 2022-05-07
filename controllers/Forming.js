import { QueryTypes } from 'sequelize';

import db from '../config/database.js';
import {
  QryGetProdForming,
  QryFormingBatch,
  FormingProdInput,
  QryFormingBatchVal,
  FormingBatchDetail,
  QryRepProductId,
  QryRepBatchId,
  QryRepBatchVal,
  QryRepProCheck,
} from '../models/formingBatch.model.js';

//GET PRODUCT
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

//GET BATCH
export const getBatchProduct = async (req, res) => {
  try {
    const batch = await db.query(QryFormingBatch, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });
    res.json(batch);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Batch Forming' });
  }
};

//GET BATCH FORM AND VALUE
export const getBatchFormVal = async (req, res) => {
  try {
    const batch = await db
      .query(QryFormingBatchVal, {
        replacements: { batchId: req.params.batchId },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(batch);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Form Batch Forming', error: error });
  }
};

//GET FORMING DATA PRODUCT
export const getFormingDataProd = async (req, res) => {
  try {
    const productCheck = await FormingProdInput.findAll({
      where: { forming_prod_date: req.params.date },
    });
    res.json(productCheck);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Input Product Forming' });
  }
};

//GET One FORMING DATA PRODUCT
export const getOneFormingDataProd = async (req, res) => {
  try {
    const productCheck = await FormingProdInput.findOne({
      where: {
        forming_prod_date: req.params.date,
        product_id: req.params.id,
        header_id: req.params.headerId,
      },
    });
    res.json(productCheck);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Input Product Forming' });
  }
};

//Create Or Update Data Product
export const postFormingDataProd = async (req, res) => {
  try {
    const findInput = await FormingProdInput.findOne({
      where: {
        forming_prod_id: req.body.forming_prod_id,
      },
    });

    if (!findInput) {
      const dataInput = await FormingProdInput.create(req.body);
      return res.json({ message: 'Data Created', data: dataInput });
    }

    const dataInput = await FormingProdInput.update(req.body, {
      where: {
        forming_prod_id: req.body.forming_prod_id,
      },
    });

    res.json({ message: 'Data Updated', data: dataInput });
  } catch (error) {
    res.status(404).json({ message: 'Error Post Data Forming Input', error });
  }
};

//Create Or Update Data Product
export const postFormingDataBatch = async (req, res) => {
  try {
    const findInput = await FormingBatchDetail.findOne({
      where: {
        forming_prod_id: req.body.forming_prod_id,
        batch_regis_id: req.body.batch_regis_id,
        standar_form_id: req.body.standar_form_id,
      },
    });

    if (!findInput) {
      const dataInput = await FormingBatchDetail.create(req.body);
      return res.json({ message: 'Data Batch Saved', data: dataInput });
    }

    const dataInput = await FormingBatchDetail.update(req.body, {
      where: {
        forming_prod_id: req.body.forming_prod_id,
      },
    });

    res.json({ message: 'Data Updated', data: dataInput });
  } catch (error) {
    res.status(404).json({ message: 'Error Save Forming Batch', error });
  }
};

//#############################################Report####################################

//GET report Product ID
export const getReportProductId = async (req, res) => {
  try {
    const prod = await db
      .query(QryRepProductId, {
        replacements: { date: req.params.date },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(prod);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Report Product ', error: error });
  }
};

//GET report Batch ID
export const getReportBatchId = async (req, res) => {
  try {
    const batch = await db
      .query(QryRepBatchId, {
        replacements: { date: req.params.date },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(batch);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Report Batch ', error: error });
  }
};

//GET report Batch Value
export const getReportBatchValue = async (req, res) => {
  try {
    const batchVal = await db
      .query(QryRepBatchVal, {
        replacements: { date: req.params.date },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(batchVal);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Report Batch ', error: error });
  }
};

//GET report ProductCheck Value
export const getReportProductCheck = async (req, res) => {
  try {
    const reprodval = await db
      .query(QryRepProCheck, {
        replacements: { date: req.params.date },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(reprodval);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Report ProdValue ', error: error });
  }
};
