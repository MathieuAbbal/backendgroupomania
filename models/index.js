const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');
const database = require('./connection');
const loadModel = async ()=>{
  await Post.belongsTo(User,{ foreignKey:'user_id', onDelete:'CASCADE'});
  await Post.hasMany(Comment,{ foreignKey:'post_id', onDelete:'CASCADE'});
  await Comment.belongsTo(User,{ foreignKey:'user_id', onDelete:'CASCADE'});
  await Like.belongsTo(Post,{ foreignKey:'post_id', onDelete:'CASCADE'});
  await Like.belongsTo(User,{ foreignKey:'user_id', onDelete:'CASCADE'}); 
  await  database.query('set FOREIGN_KEY_CHECKS=0');
  await User.sync({alter:true});
  await Post.sync({alter:true});
  await Comment.sync({alter:true});
  await Like.sync({alter:true});
  await  database.query('set FOREIGN_KEY_CHECKS=1');
};
module.exports = {User,Post,Comment,Like, loadModel};