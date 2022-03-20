import { Sequelize } from 'sequelize';

const db = new Sequelize('db_cpm', 'root', 'Asd12345.', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// const db = new Sequelize('db_cpm', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

// const db = new Sequelize('db_cpm', 'egipublic', 'Asd159789.', {
//   host: '117.74.123.236',
//   dialect: 'mysql',
//   logging: false,
// });
export default db;
