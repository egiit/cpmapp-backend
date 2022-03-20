import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

const DowntimeModel = db.define(
  'prod_downtimes',
  {
    downtime_id: { type: DataTypes.BIGINT, primaryKey: true },
    downtime_dept_id: { type: DataTypes.BIGINT },
    product_id: { type: DataTypes.BIGINT },
    batch_regis_id: { type: DataTypes.BIGINT },
    header_id: { type: DataTypes.BIGINT },
    downtime_type: { type: DataTypes.STRING },
    downtime_start: { type: DataTypes.TIME },
    downtime_end: { type: DataTypes.TIME },
    downtime_add_remark: { type: DataTypes.STRING },
    downtime_fix_remark: { type: DataTypes.STRING },
    downtime_add_id: { type: DataTypes.BIGINT },
    downtime_add_date: { type: DataTypes.DATE },
    downtime_mod_id: { type: DataTypes.BIGINT },
    downtime_mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'downtime_add_date',
    updatedAt: 'downtime_mod_date',
  }
);

export default DowntimeModel;
