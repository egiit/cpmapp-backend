import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize'; //type Query

export const QueryGetForm = db.define(
  'list_standar_form',
  {
    standar_form_id: { type: DataTypes.BIGINT(20), primaryKey: true },
    standar_from_divi: { type: DataTypes.STRING },
    standar_form_section: { type: DataTypes.STRING },
    standar_form_parent: { type: DataTypes.BIGINT },
    standar_form_param: { type: DataTypes.STRING },
    standar_form_tipe: { type: DataTypes.STRING },
    standar_form_initials: { type: DataTypes.STRING },
    standar_form_unit: { type: DataTypes.STRING },
    standar_form_order: { type: DataTypes.BIGINT },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
