import { Sequelize } from 'sequelize';

const db = new Sequelize('db_cpm', 'root', 'shi@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default db;
