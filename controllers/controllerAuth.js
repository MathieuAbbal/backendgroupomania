// Importation du modèle User 
const { User } = require('../models/index'); 
// importation du package de cyptage
const bcrypt = require('bcrypt');
//importation pour créer et verifier les TOKENS
const jwt = require('jsonwebtoken');
/**
 * Ajout d'un utilisateur
 * @ {post} /api/auth/singup
 */
exports.singup = (req, res, next) => {
  //vérifie que tous les champs sont remplis
  if (req.body.firstname === null || req.body.lastname === '' || req.body.nom === null || req.body.nom === '' || req.body.email === null || req.body.email === '' || req.body.password === null || req.body.password === '')
    return res.status(400).json({ 'error': "Veuillez remplir l'ensemble des champs du formulaire" });

  //vérifie si l'utilisateur existe dans la BDD
  User.findOne({ 
    where: { email: req.body.email }//objet de comparaison avec opérateur de sélection
  })
    .then((userExist) => {
      //si il existe pas
      if (!userExist) {
        // hash du mot de passe
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            //Création d'un nouvel utilisateur
            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash
            })
            //Sauvegarde dans la BDD
            user.save()
              .then(() => res.status(201).json({ message: "Utilisateur créé ! " }))
              .catch((error) => res.status(400).json({ error }));
          })
        //si l'utilisateur existe on renvoi un message d'erreur
      } else if (userExist) {
        return res.status(401).json({ error: "L'utilisateur existe déjà ! " })
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
/**
 * Authentification  
 * @ {post} /api/auth/login
 */
exports.login = (req, res, next) => {
  //recherche d'un utilisateur dans la BDD
  User.findOne({ where: { email: req.body.email } })//objet de comparaison avec opérateur de sélection  
    .then(user => {
      //si on trouve pas l'utilisateur
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // si on trouve un utilisateur on compare le mot de passe de la requete avec celui de la BDD
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {//recoit un boolean
          if (!valid) {//false on renvoi une erreurs
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({//true on renvoi un objet json attendu par le front
            user_id: user.id,//avec l'identifiant
            isAdmin: user.isAdmin,//les droits d'admin 
            token: jwt.sign(// et avec un token (grâce à l'appel de la fonction sign de jwt) qui servira pour les requêtes suivantes
              {
                user_id: user.id,//payload (les données qu'on veut encoder dans le token)
                isAdmin: user.isAdmin
              },
              "4bea540f75ac82d5dfea72aefd96d3c9", // clé secrète
              { expiresIn: "12h" } //durée de vie
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};