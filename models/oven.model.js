import { DataTypes } from 'sequelize';
import db from '../config/database.js';

export const QryOvenBatchVal = `SELECT  c.* , 
ab.oven_prod_id,
ab.batch_regis_id,
ab.standar_form_value
FROM list_standar_form c 
LEFT JOIN (SELECT a.* FROM  oven_prod_check_detail a
LEFT JOIN oven_prod b ON a.oven_prod_id = b.oven_prod_id
WHERE a.batch_regis_id = :batchId ) ab 
ON c.standar_form_id = ab.standar_form_id
WHERE c.standar_from_divi = 'OVEN'`;

export const QryOvenBatchList = `SELECT a.*, 
b.product_id, 
d.product_name,
n.header_id,
n.oven_prod_batch_id
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
LEFT JOIN product_batch c ON a.batch_id = c.batch_id
LEFT JOIN product d ON b.product_id = d.product_id 
LEFT JOIN oven_prod_batch n ON n.batch_regist_id = a.batch_regis_id
WHERE a.batch_regis_transfer_flag = 'Y' AND a.batch_regis_prod_flag = 'Y'
AND c.weight_comp_id = 1 
AND b.product_plan_date = :date `;

export const OvenProdInput = db.define(
  'oven_prod',
  {
    oven_prod_id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    header_id: { type: DataTypes.BIGINT(20) },
    product_id: { type: DataTypes.BIGINT(20) },
    oven_prod_date: { type: DataTypes.DATEONLY },
    oven_prod_start: { type: DataTypes.TIME },
    oven_prod_stop: { type: DataTypes.TIME },
    oven_prod_temp: { type: DataTypes.TIME },
    oven_prod_ttime: { type: DataTypes.TIME },
    oven_prod_warm_time: { type: DataTypes.TIME },
    oven_prod_remark: { type: DataTypes.TEXT },
    oven_prod_add_id: { type: DataTypes.BIGINT(20) },
    oven_prod_mod_id: { type: DataTypes.BIGINT(20) },
    oven_prod_add_date: { type: DataTypes.DATE },
    oven_prod_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'oven_prod_add_date',
    updatedAt: 'oven_prod_mod_date',
  }
);

export const OvenBatchBridge = db.define(
  //module user axces
  'oven_prod_batch',
  {
    oven_prod_batch_id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    oven_prod_id: { type: DataTypes.BIGINT(20) },
    header_id: { type: DataTypes.BIGINT(20) },
    batch_regist_id: { type: DataTypes.BIGINT(20) },
    oven_prod_batch_finish: { type: DataTypes.TIME },
    oven_prod_batch_date: { type: DataTypes.DATEONLY },
    oven_prod_batch_add_id: { type: DataTypes.BIGINT(20) },
    oven_prod_batch_mod_id: { type: DataTypes.BIGINT(20) },
    oven_prod_batch_add_date: { type: DataTypes.DATE },
    oven_prod_batch_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'oven_prod_batch_add_date',
    updatedAt: 'oven_prod_batch_mod_date',
  }
);

export const OvenBatchDetail = db.define(
  //module user axces
  'oven_prod_check_detail',
  {
    oven_prod_id: { type: DataTypes.BIGINT(20) },
    batch_regis_id: { type: DataTypes.BIGINT(20) },
    standar_form_id: { type: DataTypes.BIGINT(20) },
    standar_form_value: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

OvenBatchDetail.removeAttribute('id');

//#############################################Report####################################
//#############################################Report####################################

export const QryRepProductId = `SELECT h.header_id, h.header_shift, i.oven_prod_id, i.product_id,z.* FROM list_header_form h
LEFT JOIN oven_prod i ON h.header_id = i.header_id
LEFT JOIN 
      (SELECT DISTINCT  b.product_id , c.product_code, c.product_name, d.IMAGE_PATH product_image
      FROM frml_batch_regis a 
      LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id 
      LEFT JOIN product c ON c.product_id = b.product_id
      LEFT JOIN xref_image d ON d.IMAGE_SRC = 'ITEM' AND d.IMAGE_KEY_ID = c.product_id
      WHERE a.batch_regis_transfer_flag = 'Y'
      AND a.batch_regis_prod_flag = 'Y' AND b.product_plan_date = :date) z
ON i.product_id = z.product_id
where h.header_prod_date = :date AND h.header_dept_id = 2  AND i.oven_prod_id IS NOT NULL 
 `;

export const QryRepOvenBatchList = `SELECT DISTINCT a.oven_prod_id, 
a.product_id, 
a.header_id, b.batch_regis_id FROM oven_prod a
LEFT JOIN oven_prod_check_detail b ON a.oven_prod_id = b.oven_prod_id
WHERE a.oven_prod_date = :date
`;

export const QryRepOvenBatchVal = `SELECT  c.* , 
ab.oven_prod_id,
ab.batch_regis_id,
ab.standar_form_value
FROM list_standar_form c 
LEFT JOIN (SELECT a.* FROM  oven_prod_check_detail a
LEFT JOIN oven_prod b ON a.oven_prod_id = b.oven_prod_id
WHERE b.oven_prod_date = :date ) ab 
ON c.standar_form_id = ab.standar_form_id
WHERE c.standar_from_divi = 'OVEN'`;

// export const QryRepBatchId = `SELECT a.batch_regis_id,
// a.batch_id,
// a.batch_regis_sequen,
// a.batch_regis_transfer_time,
// b.product_id,
// d.product_name
// FROM frml_batch_regis a
// LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
// LEFT JOIN product_batch c ON a.batch_id = c.batch_id
// LEFT JOIN product d ON b.product_id = d.product_id
// WHERE a.batch_regis_transfer_flag = 'Y' AND a.batch_regis_prod_flag = 'Y'
// AND c.weight_comp_id = 1
// AND b.product_plan_date = :date `;

// export const QryRepBatchVal = `SELECT  c.standar_form_id,
// c.standar_form_section,
// c.standar_form_parent,
// c.standar_form_param,
// c.standar_form_order,
// ab.oven_prod_id,
// ab.header_id,
// ab.product_id,
// ab.batch_regis_id,
// ab.standar_form_value,
// ab.oven_batch_prod_flag
// FROM list_standar_form c
// LEFT JOIN (SELECT a.*, b.header_id, b.product_id FROM  oven_prod_check_detail a
// LEFT JOIN oven_prod b ON a.oven_prod_id = b.oven_prod_id
// WHERE b.oven_prod_date = :date ) ab
// ON c.standar_form_id = ab.standar_form_id
// WHERE c.standar_from_divi = 'FORMING'`;

// export const QryRepProCheck = `SELECT a.* , SEC_TO_TIME(a.oven_prod_tdown*60) AS total_downtime,
// TIMEDIFF(a.oven_prod_ttime, SEC_TO_TIME(a.oven_prod_tdown*60)) AS effective
// FROM oven_prod a
// WHERE a.oven_prod_date = :date `;
