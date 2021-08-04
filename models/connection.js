
const { Sequelize } = require('sequelize');

require('dotenv').config()

let database = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'mysql'
});

database.authenticate()
    .then(() => { console.log('connection à la BDD ok !') })
    .catch((error) => { console.log({ error }) });

module.exports = database;