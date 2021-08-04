//importation des modèles
const { User, Post, Comment, Like } = require('../models/index');

const fs = require('fs');

/**
 * Accés à tout les utilisateurs
 * @requête {get} /api/users/
 */
exports.findAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: error }))
};
/**
 * Accés à son profil utilisateur avec id (utilisateur connecté)
 * @requête {get} /api/users/:id
 */
exports.findOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })//objet de comparaison avec opérateur de sélection 
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }))
};
/**
 * modifie un utilisateur
 * @requête {PUT} /api/users/:id
 */
exports.modifyUser = (req, res, next) => {

 
  // gestion d'ajout/modification image de profil
 
  const userObject = req.file ?//Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux   
    {
      ...req.body.user,//opérateur spread pour faire une copie de la variable
      avatar:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))    
    .catch(error => res.status(400).json({ error }));
};
/**
 * supprime utilisateur 
 * @requête {DELETE} /api/users/:id
 */
exports.deleteUser = (req, res, next) => {
  Like.destroy({ where: { user_id: req.params.id } })//objet de comparaison avec opérateur de sélection
    .then(() =>
      Comment.destroy({ where: { user_id: req.params.id } })//objet de comparaison avec opérateur de sélection
        .then(() =>
          Post.findAll({ where: { user_id: req.params.id } })//renvoie les valeurs du tableau qui respecte la condition donnée par la fonction de test passée en argument
            .then((posts) => {
              posts.forEach(post => {//pour chaque éléments du tableau on execute la fonction 
                Comment.destroy({ where: { post_id: post.id } })//supprime les commentaires
                Like.destroy({ where: { post_id: post.id } })//supprime les likes
                Post.destroy({ where: { id: post.id } })//supprime les posts
              }
              )
            }
            )
            .then(() =>
              User.findOne({ where: { id: req.params.id } })//objet de comparaison avec opérateur de sélection
                .then(user => {
                  const filename = user.avatar.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                  User.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
                  })
                })
            )
        )
    )
    .catch(error => res.status(400).json({ error }));
};

/**
 * modifie droit d'admin
 * 
*/
