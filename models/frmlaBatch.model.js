import { Sequelize } from 'sequelize';
import db from '../config/database.js';

import { DataTypes } from 'Sequelize';

const FormulaBatch = db.define(
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
    batch_regis_shift: { type: DataTypes.INTEGER },
    batch_regis_transfer_flag: { type: DataTypes.STRING },
    batch_regis_prod_flag: { type: DataTypes.STRING },
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

export default FormulaBatch;
