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
AND b.product_plan_date = :date
#AND d.product_id LIKE '%%'`;
