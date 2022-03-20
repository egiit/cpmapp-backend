import { Sequelize } from 'sequelize';

const db = new Sequelize('db_cpm', 'root', 'Asd12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// const db = new Sequelize('db_cpm', 'egiw', 'Asd159789.', {
//   host: '192.168.10.170',
//   dialect: 'mysql',
//   logging: false,
// });
export default db;
