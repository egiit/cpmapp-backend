import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

export const QueryGetProduct = `SELECT DISTINCT b.product_id , c.product_code, c.product_name, d.IMAGE_PATH product_image
FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id 
LEFT JOIN product c ON c.product_id = b.product_id
LEFT JOIN xref_image d ON d.IMAGE_SRC = 'ITEM' AND d.IMAGE_KEY_ID = c.product_id
WHERE a.batch_regis_transfer_flag = 'Y' AND b.product_plan_date = :plandate`;

export const QueryGetBatch = `SELECT a.*, b.product_id FROM frml_batch_regis a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
LEFT JOIN product_batch c ON a.batch_id = c.batch_id
WHERE a.batch_regis_transfer_flag = 'Y' AND b.product_plan_date = :plandate AND c.weight_comp_id = 1`;

export const ProCheck = db.define(
  //module user axces
  'mixer_proc_chek',
  {
    mixer_proc_chek_id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    header_id: { type: DataTypes.BIGINT(20) },
    batch_regis_id: { type: DataTypes.BIGINT(20) },
    transfer_flagh: { type: DataTypes.STRING },
    transfer_time: { type: DataTypes.DATE },
    mixer_proc_chek_date: { type: DataTypes.DATEONLY },
    mixer_proc_chek_shift: { type: DataTypes.STRING },
    mixer_proc_chek_add_date: { type: DataTypes.DATE },
    mixer_proc_chek_add_id: { type: DataTypes.BIGINT(20) },
    mixer_proc_check_mod_date: { type: DataTypes.DATE },
    mixer_proc_check_mod_id: { type: DataTypes.BIGINT(20) },
  },
  {
    freezeTableName: true,
    createdAt: 'mixer_proc_chek_add_date',
    updatedAt: 'mixer_proc_check_mod_date',
  }
);

export const MixerProCheckDetail = db.define(
  'mixer_proc_chek_detail',
  {
    mixer_proc_check_id: { type: DataTypes.BIGINT(20) },
    standar_form_id: { type: DataTypes.BIGINT(20) },
    standar_form_value: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);

MixerProCheckDetail.removeAttribute('id');

export const QueryFormandValue = `SELECT  sa.mixer_proc_check_id, a.*, sa.standar_form_value  FROM list_standar_form a 
left join (
	select * from mixer_proc_chek_detail b 
	LEFT JOIN mixer_proc_chek c ON b.mixer_proc_check_id = c.mixer_proc_chek_id 
	where c.batch_regis_id = :batchregisid
) sa on a.standar_form_id = sa.standar_form_id
WHERE a.standar_from_divi = :dept `;

export const MixerFrmlParams = db.define(
  'mixer_frml_checklist',
  {
    mixer_frml_id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true,
    },
    standar_form_id: { type: DataTypes.BIGINT(20) },
    mixer_frml_params: { type: DataTypes.STRING },
    product_id: { type: DataTypes.BIGINT(20) },
    header_id: { type: DataTypes.BIGINT(20) },
    mixer_frml_add_id: { type: DataTypes.BIGINT(20) },
    mixer_frml_add_date: { type: DataTypes.DATE },
    mixer_frml_mod_id: { type: DataTypes.BIGINT(20) },
    mixer_frml_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'mixer_frml_add_date',
    updatedAt: 'mixer_frml_mod_date',
  }
);

export const QueryMixFrml = `SELECT c.standar_form_id, 
c.standar_from_divi, 
c.standar_form_param, 
c.standar_form_tipe,
d.mixer_frml_id,
d.mixer_frml_params,
d.product_id
FROM list_standar_form c 
LEFT JOIN 
	(
	SELECT a.mixer_frml_id, a.mixer_frml_params, a.standar_form_id, a.product_id FROM 
  mixer_frml_checklist a 
	LEFT JOIN list_header_form b ON a.header_id = b.header_id 
	WHERE b.header_id = :headerId AND a.product_id = :productId)
d ON c.standar_form_id = d.standar_form_id 
WHERE c.standar_from_divi = 'MIXER_CHECK' 
`;

// export const QueryMixFrmlVal = `	SELECT  a.mixer_frml_id, a.mixer_frml_params, a.standar_form_id, a.product_id, e.batch_regis_id, e.mixer_frml_value FROM mixer_frml_checklist a
// LEFT JOIN list_header_form b ON a.header_id = b.header_id
// LEFT JOIN mixer_frml_check_detail e ON e.mixer_frml_id = a.mixer_frml_id
//  WHERE b.header_id = :headerId AND a.product_id = :productId`;

export const MixFrmlVal = db.define(
  'mixer_frml_check_detail',
  {
    mixer_frml_id: { type: DataTypes.BIGINT(20) },
    batch_regis_id: { type: DataTypes.BIGINT(20) },
    mixer_frml_value: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);

MixFrmlVal.removeAttribute('id');

export const QueryMixFrmlVal = `SELECT c.standar_form_id,
  d.product_id,
  d.mixer_frml_id,
  d.batch_regis_id,
  c.standar_from_divi,
  c.standar_form_param,
  d.mixer_frml_params,
  d.mixer_frml_value
  FROM list_standar_form c
LEFT JOIN
 	(
	SELECT  a.mixer_frml_id, a.mixer_frml_params, a.standar_form_id, a.product_id, e.batch_regis_id, e.mixer_frml_value FROM mixer_frml_checklist a
	LEFT JOIN list_header_form b ON a.header_id = b.header_id
	LEFT JOIN mixer_frml_check_detail e ON e.mixer_frml_id = a.mixer_frml_id
 	WHERE b.header_id = :headerId AND a.product_id = :productId
 	) d ON c.standar_form_id = d.standar_form_id
 WHERE c.standar_from_divi = 'MIXER_CHECK'`;

//######### Report ################//

export const QueryRepProdForChart = `SELECT DISTINCT 
 b.product_id, 
 d.product_name,
 e.mixer_proc_chek_shift
 FROM frml_batch_regis a 
 LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
 LEFT JOIN product_batch c ON a.batch_id = c.batch_id
 LEFT JOIN product d ON b.product_id = d.product_id 
 LEFT JOIN mixer_proc_chek e ON a.batch_regis_id = e.batch_regis_id
 WHERE a.batch_regis_transfer_flag = 'Y' 
 AND c.weight_comp_id = 1 
 AND b.product_plan_date = :date 
 AND d.product_id LIKE :productId
 AND e.mixer_proc_chek_shift LIKE :shiftId`;

export const QueryRepBatch = `SELECT a.*, 
DATE_FORMAT(a.batch_regis_start_time,'%H:%i:%s') start_time, 
DATE_FORMAT(a.batch_regis_end_time,'%H:%i:%s') finish_time,
 TIMESTAMPDIFF(MINUTE, a.batch_regis_start_time, a.batch_regis_end_time) AS Ttime, 
 b.product_id, 
 e.mixer_proc_chek_id,
 d.product_name,
 e.mixer_proc_chek_shift
 FROM frml_batch_regis a 
 LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
 LEFT JOIN product_batch c ON a.batch_id = c.batch_id
 LEFT JOIN product d ON b.product_id = d.product_id 
 LEFT JOIN mixer_proc_chek e ON a.batch_regis_id = e.batch_regis_id
 WHERE a.batch_regis_transfer_flag = 'Y' 
 AND c.weight_comp_id = 1 
 AND b.product_plan_date = :date 
 AND d.product_id LIKE :productId
 AND IFNULL(e.mixer_proc_chek_shift, '')  LIKE :shiftId`;

export const QueryTimeProccess = `SELECT b.mixer_proc_check_id,  b.standar_form_value AS mulai, d.standar_form_value AS selesai, 
TIME_FORMAT(TIMEDIFF(d.standar_form_value,b.standar_form_value), '%H:%i' ) AS ttime_proc
from mixer_proc_chek_detail b 
	LEFT JOIN mixer_proc_chek c ON b.mixer_proc_check_id = c.mixer_proc_chek_id 
	LEFT JOIN mixer_proc_chek_detail d ON b.mixer_proc_check_id =  b.mixer_proc_check_id 	
	where c.batch_regis_id = :batchregisid 
AND d.mixer_proc_check_id = :mixprocid
AND d.standar_form_id = :timeFinish 
AND b.standar_form_id = :timeStart`;

export const QueryMixMstrValue = `SELECT g.product_id, sa.batch_regis_id, sa.mixer_proc_check_id, sa.mixer_proc_chek_shift, a.*, sa.standar_form_value  FROM list_standar_form a 
left join (
	SELECT * from mixer_proc_chek_detail b 
	LEFT JOIN mixer_proc_chek c ON b.mixer_proc_check_id = c.mixer_proc_chek_id 
	#LEFT JOIN frml_batch_regis e ON c.batch_regis_id = e.batch_regis_id
	WHERE c.mixer_proc_chek_date = :date
) sa on a.standar_form_id = sa.standar_form_id
LEFT JOIN frml_batch_regis e ON e.batch_regis_id = sa.batch_regis_id
LEFT JOIN product_plan f ON e.product_plan_id = f.product_plan_id
LEFT JOIN product g ON g.product_id = f.product_id
WHERE a.standar_from_divi = 'MIXER'`;
