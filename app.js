//importation express
const express = require('express');
//importation du package pour avoir accès au chemin du fichier
const path = require('path');
//importation de helmet (securité des entête HTTP)
const helmet = require("helmet");
//importation des models
const {loadModel}= require('./models/index');

// Création d'une application express
const app = express();
//Importation des routes
const authRoute = require('./routes/routeAuth');
const userRoute = require('./routes/routeUser');
const postRoute = require('./routes/routePost');
const commentRoute = require('./routes/routeComment');
const likeRoute = require('./routes/routeLike');
//// Middleware Header pour éviter les erreurs sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
loadModel();
//permet de décoder une requête encodée en json
app.use(express.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
//enregistrement des routers
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/posts/:id/comments',commentRoute);
app.use('/api/likes', likeRoute);


module.exports = app;