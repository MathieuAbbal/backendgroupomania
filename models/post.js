//import
const database = require('./connection');
const {DataTypes}= require('sequelize');
const Post = database.define('Post', {
  
    imageurl:{ 
        type: DataTypes.STRING  
    },
    title :{ 
        allowNull: false,
        type: DataTypes.STRING
    },   
    content:{ 
        allowNull: false,
        type: DataTypes.TEXT
    }
});

module.exports = Post;