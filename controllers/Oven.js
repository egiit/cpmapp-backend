import { QueryTypes } from 'sequelize';

import db from '../config/database.js';
import {
  OvenBatchBridge,
  OvenBatchDetail,
  OvenProdInput,
  QryOvenBatchList,
  QryOvenBatchVal,
  QryRepOvenBatchList,
  QryRepOvenBatchVal,
  QryRepProductId,
} from '../models/oven.model.js';

//GET Oven DATA PRODUCT
export const getOvenDataProd = async (req, res) => {
  try {
    const productCheck = await OvenProdInput.findAll({
      where: { oven_prod_date: req.params.date },
    });
    res.json(productCheck);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Input Product Oven' });
  }
};

//GET Oven DATA Batch List
export const getOvenBatchList = async (req, res) => {
  try {
    const batchL = await db
      .query(QryOvenBatchList, {
        replacements: { date: req.params.date },
        type: QueryTypes.SELECT,
      })
      .catch((error) => console.log(error));
    res.json(batchL);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Batch List ', error: error });
  }
};

//GET One Oven Batch Bridge
export const getOneOvenBatchBridge = async (req, res) => {
  try {
    const batchBridge = await OvenBatchBridge.findOne({
      where: {
        batch_regist_id: req.params.id,
      },
    });
    res.json(batchBridge);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Input Product Oven' });
  }
};

//GET One Oven DATA PRODUCT
export const getOneOvenDataProd = async (req, res) => {
  try {
    const productCheck = await OvenProdInput.findOne({
      where: {
        oven_prod_date: req.params.date,
        product_id: req.params.id,
        header_id: req.params.headerId,
      },
    });
    res.json(productCheck);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil data Input Product Oven' });
  }
};

export const postOvenDataProd = async (req, res) => {
  try {
    const findInput = await OvenProdInput.findOne({
      where: {
        oven_prod_id: req.body.oven_prod_id,
      },
    });

    if (!findInput) {
      const dataInput = await OvenProdInput.create(req.body);
      return res.json({ message: 'Data Created', data: dataInput });
    }

    const dataInput = await OvenProdInput.update(req.body, {
      where: {
        oven_prod_id: req.body.oven_prod_id,
      },
    });

    res.json({ message: 'Data Updated', data: dataInput });
  } catch (error) {
    res.status(404).json({ message: 'Error Post Data Oven Input', error });
  }
};

//getadabatch form with value
export const getOvenBatchVal = async (req, res) => {
  try {
    const dataBatchVal = await db.query(QryOvenBatchVal, {
      replacements: { batchId: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(dataBatchVal);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil Data Batch', error: error });
  }
};

//Create Or Update Data Product
export const postOvenDataBatch = async (req, res) => {
  try {
    const findInput = await OvenBatchDetail.findOne({
      where: {
        oven_prod_id: req.body.oven_prod_id,
        batch_regis_id: req.body.batch_regis_id,
        standar_form_id: req.body.standar_form_id,
      },
    });

    if (!findInput) {
      const dataInput = await OvenBatchDetail.create(req.body);
      return res.json({ message: 'Data Batch Saved', data: dataInput });
    }

    const dataInput = await OvenBatchDetail.update(req.body, {
      where: {
        oven_prod_id: req.body.oven_prod_id,
        batch_regis_id: req.body.batch_regis_id,
        standar_form_id: req.body.standar_form_id,
      },
    });

    res.json({ message: 'Data Updated', data: dataInput });
  } catch (error) {
    res.status(404).json({ message: 'Error Save Oven Batch', error });
  }
};

//Create Or Update Oven Bridge Batch and Header,
export const postOvenBridgeBatch = async (req, res) => {
  try {
    const findInput = await OvenBatchBridge.findOne({
      where: {
        oven_prod_batch_id: req.body.oven_prod_batch_id,
      },
    });

    if (!findInput) {
      const bridgeBatch = await OvenBatchBridge.create(req.body);
      return res.json({ message: 'Data Batch Saved', data: bridgeBatch });
    }

    const bridgeBatch = await OvenBatchBridge.update(req.body, {
      where: {
        oven_prod_batch_id: req.body.oven_prod_batch_id,
      },
    });

    res.json({ message: 'Data Updated', data: bridgeBatch });
  } catch (error) {
    res.status(404).json({ message: 'Error Save Oven Batch', error });
  }
};

//######################## report ###################################

//GET report Product ID oven
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

//Amil data Product Info Operational
export const getRepProductInfo = async (req, res) => {
  try {
    const prodInfo = await OvenProdInput.findAll({
      where: { oven_prod_date: req.params.date },
    });

    res.json(prodInfo);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Report Product Info ', error: error });
  }
};

//getadabatchLIst
export const getRepOvenBatchList = async (req, res) => {
  try {
    const dataBatchVal = await db.query(QryRepOvenBatchList, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(dataBatchVal);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error Ambil Data Batch List', error: error });
  }
};

//getadabatch form with value by date
export const getRepOvenBatchVal = async (req, res) => {
  try {
    const dataBatchVal = await db.query(QryRepOvenBatchVal, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(dataBatchVal);
  } catch (error) {
    res.status(404).json({ message: 'Error Ambil Data Batch', error: error });
  }
};
