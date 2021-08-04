//import
const database = require('./connection');
const {DataTypes}= require('sequelize');
const Like = database.define('Like', {
        like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Like;