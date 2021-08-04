const express =require('express');
const router = express.Router();
const likeCtrl = require('../controllers/controllerLike');


//Route pour créer un like
router.post('/', likeCtrl.createLike);

module.exports= router;