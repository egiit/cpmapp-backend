import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

export const FormulaBatch = db.define(
  'frml_batch_regis',
  {
    batch_regis_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    batch_id: { type: DataTypes.BIGINT(20) },
    product_plan_id: { type: DataTypes.BIGINT(20) },
    batch_regis_date: { type: DataTypes.DATEONLY },
    batch_regis_weighing_date: { type: DataTypes.DATEONLY },
    batch_regis_production_date: { type: DataTypes.DATEONLY },
    batch_regis_sequen: { type: DataTypes.STRING },
    batch_regis_mixing_code: { type: DataTypes.STRING },
    batch_regis_qty: { type: DataTypes.DOUBLE },
    batch_regis_shift: { type: DataTypes.INTEGER },
    batch_regis_prod_flag: { type: DataTypes.STRING },
    batch_regis_transfer_flag: { type: DataTypes.STRING },
    batch_regis_start_time: { type: DataTypes.DATE },
    batch_regis_end_time: { type: DataTypes.DATE },
    batch_regis_transfer_time: { type: DataTypes.DATE },
    batch_regis_add_date: { type: DataTypes.DATE },
    batch_regis_add_id: { type: DataTypes.BIGINT(20) },
    batch_regis_mod_date: { type: DataTypes.DATE },
    batch_regis_mod_id: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'batch_regis_add_date',
    updatedAt: 'batch_regis_mod_date',
  }
);

export const QueryFrmlBatchChart = `SELECT a.*, 
TIMESTAMPDIFF(MINUTE, a.batch_regis_start_time, a.batch_regis_end_time) AS Ttime, 
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
AND b.product_plan_date = :plandate`;
