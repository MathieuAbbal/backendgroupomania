const {Like} = require('../models/index');

/**
 * Récupère tous les likes d'un post
 * @requête {GET} api/posts/:id/likes
 */
exports.findAllLikes = (req, res, next) => {
    Like.findAll({
      include:{all:true, nested:true},
      where: {post_id: req.params.id}})
      .then(likes => {res.status(200).json(likes)})
      .catch(error => res.status(400).json({ error }))
  };
/**
 * Création d'un like
 * @requête {POST} api/likes
 */  
exports.createLike = (req, res, next) =>{
    const likeObject = req.body;
    Like.findAll({where: {
      post_id: req.body.post_id,
      user_id: req.body.user_id
      }})
      .then(likes => {
        if(likes.length === 0) {
          const like = new Like({
            ...likeObject
          });
          // Enregistrement de l'objet like dans la base de données
          like.save()
          .then(() => {
            Like.findAll({
              where: {post_id: req.body.post_id}
            }).then(likes => {
              res.status(200).json({ like: likes.length});
            })
          })
          .catch(error => res.status(400).json({ error }));
        } else {
          Like.destroy({ where: {
            post_id: req.body.post_id,
            user_id: req.body.user_id }})
            .then(() => {
              Like.findAll({
                where: {post_id: req.body.post_id}
              }).then(likes => {
                res.status(200).json({ like: likes.length});
              })
            })
            .catch(error => res.status(400).json({ error }));
        }
      }
    )
};