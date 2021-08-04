//vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes
//importation du package pour créer et verifier les TOKENS
const jwt = require('jsonwebtoken');
// Création d'une authentification avec TOKEN 
module.exports = (req, res, next) => {
    try {
        //recupère le token dans le header en oubliant le mot clé Bearer
        const token = req.headers.authorization.split(' ')[1];//crée un tableau et récupère l'élément aprés l'espace
        //décode le token
        req.token = jwt.verify(token, '4bea540f75ac82d5dfea72aefd96d3c9');
        
            next();
        
    } catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
};