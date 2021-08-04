//importation des modèles
const { Post, Comment, Like } = require('../models/index');
//importation du module 'file system' de Node permettant de gérer les téléchargements et modifications d'images
const fs = require('fs');//pour supprimer les fichiers images

/**
 * Ajout d'une nouvelle publication
 * @requête { post }  /api/posts
 */
exports.createPost = (req, res, next) => {
    // vérification que tous les champs sont remplis
    if (req.body.title === null || req.body.title === '' || req.body.content === null || req.body.content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article" });
    }
   
     postObjet = req.file ?//Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux   
    {
      ...req.body,//opérateur spread pour faire une copie de la variable
      imageurl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    // Création d'un nouvel objet post (instance du modèle)
    const post = new Post({
        //copie les champs du corps de la requête
        ...postObjet,//opérateur spread pour faire une copie de la variable
        user_id: req.token.user_id
        
        
    });
    // Enregistrement de l'objet post dans la base de données
    post.save()
        //envoi une réponse au frontend avec un statut 201 sinon on a une expiration de la requête
        .then(() => res.status(201).json({ message: 'Publication créée !' }))
        // On ajoute un code erreur en cas de problème
       .catch(error => res.status(400).json({ error }));
};

/**
 * Récupère toutes les publications de tous les utilisateurs
 * @requête { get }  /api/posts
 */
exports.findAllPosts = (req, res, next) => {
    Post.findAll({
        include: { all: true, nested: true },
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(error => res.status(400).json({ error }));
};

/**
 * Récupère une publication
 * @requête { get }  /api/posts/:id
 */
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        include: { all: true, nested: true },
        where: { id: req.params.id }
    }) //objet de comparaison avec opérateur de sélection        

        .then(post => { res.status(200).json(post) })
        .catch(error => res.status(404).json({ error }));
};
/**
 * Récupère toutes les publications d'un utilisateur en particulier(user_id)
 * @requête { get } /api/posts
 */
exports.findPostsByUserId = (req, res, next) => {
    Post.findAll({
        include: { all: true, nested: true },
        where: { user_id: req.params.id },//objet de comparaison avec opérateur de sélection
        order: [
            ['createdAt', 'DESC'],
        ]
    })
    .then(posts => {
        res.status(200).json({ posts });
    })
    .catch(error => res.status(400).json({ error }));
};
/**
 * Modifie une publication
 * @requête { PUT } /api/posts/:id
 */
exports.modifyPost = (req, res, next) => {
    //Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
    Post.findOne({where: { id: req.params.id } }) //objet de comparaison avec opérateur de sélection        
        .then(post => {
            if (post.user_id === req.token.user_id) {
                const postObject = req.file ?//on regarde si il y a un fichier dans la requête
                    {
                        ...req.body,
                        imageurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    } : { ...req.body };
                    const filename = post.imageurl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                    Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
                     .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                     .catch(error => res.status(400).json({ error }));
                })
            }
            else {
                res.status(403).json({ 'message': 'Vous n\'ètes pas autoriser' })
            }
        })
        .catch(error => res.status(404).json({ error }));

};
/**
 * Suppression d'une publication
 * @requête {DELETE}/api/posts/:id
 */
exports.deletePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if (post.imageurl !== null) {
            const filename = post.imageurl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { 
            Post.destroy({ where: {id: req.params.id} }) 
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        }
        Post.destroy({ where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ message: "Post introuvable", error: error }))
};