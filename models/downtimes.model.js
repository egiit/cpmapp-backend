import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

export const DowntimeModel = db.define(
  'prod_downtimes',
  {
    downtime_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    downtime_dept_id: { type: DataTypes.BIGINT },
    product_id: { type: DataTypes.BIGINT },
    batch_regis_id: { type: DataTypes.BIGINT },
    header_id: { type: DataTypes.BIGINT },
    downtime_type: { type: DataTypes.STRING },
    downtime_start: { type: DataTypes.TIME },
    downtime_end: { type: DataTypes.TIME },
    downtime_repair: { type: DataTypes.TIME },
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

export const QueryRepDowntime = `SELECT a.*, TIMEDIFF(a.downtime_end, a.downtime_start) AS ttime, b.product_name, c.batch_regis_sequen  From prod_downtimes a 
LEFT JOIN product b ON a.product_id = b.product_id
LEFT JOIN frml_batch_regis c ON a.batch_regis_id = c.batch_regis_id
WHERE a.downtime_dept_id = :deptId AND a.downtime_start LIKE :date`;

export const QueryAllDowntime = `SELECT a.*, TIMEDIFF(a.downtime_end, a.downtime_start) AS ttime, b.product_name, c.batch_regis_sequen, d.DEP_NAME  
From prod_downtimes a 
LEFT JOIN product b ON a.product_id = b.product_id
LEFT JOIN frml_batch_regis c ON a.batch_regis_id = c.batch_regis_id
LEFT JOIN xref_dept d ON  a.downtime_dept_id = d.DEP_ID
WHERE a.downtime_start LIKE :date`;
