/**
 * Routeur qui contient la logique de routing pour l'AUTHENTIFICATION
 */
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/controllerAuth');

//route pour enregister un utilisateur
router.post('/signup', authCtrl.singup);
//route pour authentifier un utilisateur existant
router.post('/login', authCtrl.login);


module.exports = router;