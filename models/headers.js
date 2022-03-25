import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

//update or Create User Access
export const Headers = db.define(
  //module user axces
  'list_header_form',
  {
    header_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    header_prod_date: { type: DataTypes.DATEONLY },
    header_shift: { type: DataTypes.INTEGER },
    header_operator: { type: DataTypes.STRING },
    header_leader: { type: DataTypes.STRING },
    header_dept_id: { type: DataTypes.INTEGER },
    header_add_id: { type: DataTypes.BIGINT(20) },
    header_mod_id: { type: DataTypes.BIGINT(20) },
    header_add_date: { type: DataTypes.DATE },
    header_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'header_add_date',
    updatedAt: 'header_mod_date',
  }
);

// export const ShiftHeader = db.define(
//   //module user axces
//   'shift_prod_detail',
//   {
//     shift_prod_date: { type: DataTypes.DATEONLY },
//     shift_prod_id: { type: DataTypes.INTEGER, primaryKey: true },
//     shift_user_id: { type: DataTypes.INTEGER },
//     shift_dept_id: { type: DataTypes.INTEGER },
//     shift_header_id: { type: DataTypes.INTEGER },
//     shift_add_date: { type: DataTypes.DATE },
//     shift_mod_date: { type: DataTypes.DATE },
//   },
//   {
//     freezeTableName: true,
//     createdAt: 'shift_add_date',
//     updatedAt: 'shift_mod_date',
//   }
// );
