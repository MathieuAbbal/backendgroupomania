//import
const database = require('./connection');

const {DataTypes}= require('sequelize');
const Comment = database.define('Comment', {
    
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;