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

export const QueryFormandValue = `SELECT a.*, sa.standar_form_value  FROM list_standar_form a 
left join (
	select * from mixer_proc_chek_detail b 
	LEFT JOIN mixer_proc_chek c ON b.mixer_proc_check_id = c.mixer_proc_chek_id 
	where c.batch_regis_id = :batchregisid
) sa on a.standar_form_id = sa.standar_form_id
WHERE a.standar_from_divi = :dept `;
