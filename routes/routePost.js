/**
 * Routeur qui contient la logique de routing des PUBLICATIONS
 */
//importation express
const express = require('express');
//création du Routeur
const router = express.Router();
//importation du controller
const postCtrl = require('../controllers/controllerPost') ;
const commentCtrl = require('../controllers/controllerComment')
const likeCtrl = require('../controllers/controllerLike');
const auth = require('../middelware/auth');
//importation pour la gestion des fichiers entrant
const multer = require('../middelware/multer-config');


//on applique le fonction aux routes
//route pour récupérer toutes les publications de tous les utilisateurs
router.get('/', auth, postCtrl.findAllPosts );
//route pour récupérer tous les commentaires
router.get('/:id/comments',auth, commentCtrl.findAllComments); 
//route pour récupèrer tous les likes
router.get('/:id/likes', auth, likeCtrl.findAllLikes);
//route pour créer une publication
router.post('/', auth, multer, postCtrl.createPost);
//route pour récupérer une publication
router.get('/:id', auth, postCtrl.findOnePost);
//route pour modifié une publication
router.put('/:id', auth, multer, postCtrl.modifyPost);
//route pour supprimer une publication
router.delete('/:id', auth, postCtrl.deletePost );

module.exports = router;