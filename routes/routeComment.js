/**
 * Routeur qui contient la logique de routing des COMMENTAIRE
 */
const express = require('express');
//création du router
const router= express.Router();
//importation du controller
const commentCtrl = require('../controllers/controllerComment');
//importation authentification
const auth = require('../middelware/auth')

//route pour ajouter un commentaire
router.post('/', auth, commentCtrl.createComment);
//route pour récupérer un commentaire d'une publication
router.get('/:id', auth, commentCtrl.findOneComment);
//route pour réupérer tous les commentaire d'une publication
router.get('/', auth, commentCtrl.findAllComments)
//route pour supprimer un commentaire
router.delete('/:id', auth, commentCtrl.deleteComment);



module.exports = router;