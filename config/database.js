import { Sequelize } from 'sequelize';

const db = new Sequelize('db_cpm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default db;
