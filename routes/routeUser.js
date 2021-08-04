/**
 * Routeur qui contient la logique de routing des UTILISATEURS
 */
const express = require('express');
//création du routeur
const router = express.Router();
//importation des controllers
const userCtrl = require('../controllers/controllerUser');
const postCtrl = require('../controllers/controllerPost')
//importation pour la gestion des fichiers entrant
const multer = require('../middelware/multer-config');
//imortation pour l'authentification
const auth = require('../middelware/auth');


//route pour afficher tout les utilisateurs
router.get('/', auth, userCtrl.findAllUsers)
//route pour afficher un utilisateur
router.get('/:id', auth, userCtrl.findOneUser);
//route pour afficher toute les publications d'un utilisateur en particulier
router.get('/:id/posts',auth, postCtrl.findPostsByUserId);
//route pour modifier un utilisateur
router.put('/:id',auth, multer, userCtrl.modifyUser);
//route pour supprimer un utilisateur
router.delete('/:id',auth,userCtrl.deleteUser);

//exportation du routeur
module.exports = router;