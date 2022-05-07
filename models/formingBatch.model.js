import { DataTypes } from 'sequelize';
import db from '../config/database.js';

export const QryGetProdForming = `SELECT DISTINCT b.product_id , c.product_code, c.product_name, d.IMAGE_PATH product_image
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id 
LEFT JOIN product c ON c.product_id = b.product_id
LEFT JOIN xref_image d ON d.IMAGE_SRC = 'ITEM' AND d.IMAGE_KEY_ID = c.product_id
WHERE a.batch_regis_transfer_flag = 'Y' AND a.batch_regis_prod_flag = 'Y' AND b.product_plan_date = :date`;

export const QryFormingBatch = `SELECT a.*, 
TIMESTAMPDIFF(MINUTE, a.batch_regis_start_time, a.batch_regis_end_time) AS Ttime, 
b.product_id, 
d.product_name
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
LEFT JOIN product_batch c ON a.batch_id = c.batch_id
LEFT JOIN product d ON b.product_id = d.product_id 
WHERE a.batch_regis_transfer_flag = 'Y' AND a.batch_regis_prod_flag = 'Y'
AND c.weight_comp_id = 1 
AND b.product_plan_date = :date `;

export const QryFormingBatchVal = `SELECT  c.* , 
ab.forming_prod_id,
ab.batch_regis_id,
ab.standar_form_value,
ab.forming_batch_prod_flag
FROM list_standar_form c 
LEFT JOIN (SELECT a.* FROM  forming_prod_check_detail a
LEFT JOIN forming_prod b ON a.forming_prod_id = b.forming_prod_id
WHERE a.batch_regis_id = :batchId ) ab 
ON c.standar_form_id = ab.standar_form_id
WHERE c.standar_from_divi = 'FORMING'
`;

export const FormingProdInput = db.define(
  //module user axces
  'forming_prod',
  {
    forming_prod_id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    header_id: { type: DataTypes.BIGINT(20) },
    product_id: { type: DataTypes.BIGINT(20) },
    forming_prod_date: { type: DataTypes.DATEONLY },
    forming_prod_start: { type: DataTypes.TIME },
    forming_prod_stop: { type: DataTypes.TIME },
    forming_prod_ttime: { type: DataTypes.TIME },
    forming_prod_cleaning: { type: DataTypes.INTEGER },
    forming_prod_setting: { type: DataTypes.INTEGER },
    forming_prod_tdown: { type: DataTypes.INTEGER },
    forming_prod_reject_mesin: { type: DataTypes.INTEGER },
    forming_prod_reject_lantai: { type: DataTypes.INTEGER },
    forming_prod_reject_tot: { type: DataTypes.INTEGER },
    forming_prod_remark: { type: DataTypes.TEXT },
    forming_prod_add_id: { type: DataTypes.BIGINT(20) },
    forming_prod_mod_id: { type: DataTypes.BIGINT(20) },
    forming_prod_add_date: { type: DataTypes.DATE },
    forming_prod_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'forming_prod_add_date',
    updatedAt: 'forming_prod_mod_date',
  }
);

export const FormingBatchDetail = db.define(
  //module user axces
  'forming_prod_check_detail',
  {
    forming_prod_id: { type: DataTypes.BIGINT(20) },
    batch_regis_id: { type: DataTypes.BIGINT(20) },
    standar_form_id: { type: DataTypes.BIGINT(20) },
    standar_form_value: { type: DataTypes.STRING },
    forming_batch_prod_flag: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

FormingBatchDetail.removeAttribute('id');

//#############################################Report####################################
//#############################################Report####################################

export const QryRepProductId = `SELECT DISTINCT h.header_shift,  b.product_id , c.product_code, c.product_name, d.IMAGE_PATH product_image
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id 
LEFT JOIN product c ON c.product_id = b.product_id
LEFT JOIN xref_image d ON d.IMAGE_SRC = 'ITEM' AND d.IMAGE_KEY_ID = c.product_id
LEFT JOIN list_header_form h ON h.header_prod_date = :date
LEFT JOIN forming_prod i ON h.header_id = i.header_id
WHERE a.batch_regis_transfer_flag = 'Y'
AND a.batch_regis_prod_flag = 'Y' AND b.product_plan_date = :date `;

export const QryRepBatchId = `SELECT a.batch_regis_id,
a.batch_id,
a.batch_regis_sequen, 
a.batch_regis_transfer_time,
b.product_id, 
d.product_name
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
LEFT JOIN product_batch c ON a.batch_id = c.batch_id
LEFT JOIN product d ON b.product_id = d.product_id 
WHERE a.batch_regis_transfer_flag = 'Y' AND a.batch_regis_prod_flag = 'Y'
AND c.weight_comp_id = 1 
AND b.product_plan_date = :date `;

export const QryRepBatchVal = `SELECT  c.standar_form_id,
c.standar_form_section, 
c.standar_form_parent,
c.standar_form_param,
c.standar_form_order,
ab.forming_prod_id,
ab.header_id,
ab.product_id,
ab.batch_regis_id,
ab.standar_form_value,
ab.forming_batch_prod_flag
FROM list_standar_form c 
LEFT JOIN (SELECT a.*, b.header_id, b.product_id FROM  forming_prod_check_detail a
LEFT JOIN forming_prod b ON a.forming_prod_id = b.forming_prod_id
WHERE b.forming_prod_date = :date ) ab 
ON c.standar_form_id = ab.standar_form_id
WHERE c.standar_from_divi = 'FORMING'`;

export const QryRepProCheck = `SELECT a.* , SEC_TO_TIME(a.forming_prod_tdown*60) AS total_downtime, 
TIMEDIFF(a.forming_prod_ttime, SEC_TO_TIME(a.forming_prod_tdown*60)) AS effective
FROM forming_prod a 
WHERE a.forming_prod_date = :date `;
