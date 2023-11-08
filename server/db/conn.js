import Sequelize from 'sequelize';
const config = { dialect: 'postgres', host: process.env.HOST || 'localhost' };

if (process.env.QUIET) {
  config.logging = false;
}
const conn = new Sequelize(
  process.env.DATABASE_NAME || 'acme_db',
  process.env.USERNAME || null,
  process.env.PASSWORD || null,
  config
);

export default conn;
