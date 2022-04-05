import { Sequelize } from 'sequelize';

const db = new Sequelize('db_cpm', 'root', 'Asd12345.', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00',
  dialectOptions: {
    timezone: 'local',
  },
});

// const db = new Sequelize('db_cpm', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

// const server = ['192.168.10.168', '117.74.123.236', 'localhost']

// const db = new Sequelize('db_cpm', 'egipublic', 'Asd159789.', {
//   host: '192.168.10.168',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });
// const db = new Sequelize('db_cpm', 'egipublic', 'Asd159789.', {
//   host: '117.74.123.236',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });

export default db;
