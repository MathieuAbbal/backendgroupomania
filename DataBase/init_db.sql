-- Création de la table Utilisateurs --
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT, -- numerique entier positif (0 à 65.536)  incrémentée automatiquement à chaque ajout d'enregistrement
  prenom VARCHAR(255) NOT NULL, -- chaîne de caractère max 255 taille non fixe
  nom VARCHAR(255) NOT NULL,  -- chaîne de caractère max 255 taille non fixe
  email VARCHAR(255) NOT NULL,-- chaîne de caractère max 255 taille non fixe
  password VARCHAR(255) NOT NULL,-- chaîne de caractère max 255 taille non fixe
  avatar VARCHAR(255) DEFAULT NULL,-- chaîne de caractère max 255 taille non fixe
  bio TEXT DEFAULT NULL, -- chaîne de caractère
  isAdmin TINYINT UNSIGNED NOT NULL DEFAULT '0',-- entier positif de 1 octet
  PRIMARY KEY(id),-- défini la clé primaire
  UNIQUE KEY email_UNIQUE (email)-- rend l'email unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8;--moteur de stokage + utf8 comme jeu de caractères

-- Création de la table des publications --
DROP TABLE  IF EXISTS Posts;
CREATE TABLE Posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT, -- numérique entier positif de 4 octets 
  publication_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,-- Date et Heure (nombre de secondes écoulés depuis le 1er janvier 1970)
  user_id INT UNSIGNED NOT  NULL , -- numerique entier positif 1 octet
  imageurl VARCHAR(255),--  chaîne de caractère max 255 taille non fixe
  content TEXT, -- chaîne de caractères  
  PRIMARY KEY(id),-- défini la clé primaire
  KEY userId_idx (user_id), -- défini la clé étrangère qui va permettre la jointure
  CONSTRAINT fk_Posts_Users -- nom de la contrainte
  FOREIGN KEY (user_id)-- colonne sur laquelle on a ajouté la clé
  REFERENCES Users (id) -- table et colonne de référence 
  ON DELETE CASCADE  ON UPDATE CASCADE  --défini le comportement lors de la suppression ou modifivation d'une référence
)ENGINE=InnoDB DEFAULT CHARSET=utf8;--moteur de stokage + utf8 comme jeu de caractères

-- Création de la table des commentaires --
DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT , -- numérique entier positif de 4 octets
  publication_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,-- Date et Heure (nombre de secondes écoulés depuis le 1er janvier 1970)
  user_id INT  UNSIGNED NOT NULL  ,  -- numérique entier positif
  posts_id INT UNSIGNED NOT NULL  , -- numérique entier positif 
  content TEXT NOT NULL , -- chaîne de caractères
  PRIMARY KEY (id), -- défini la clé primaire
  KEY userId_idx (user_id), -- défini la clé étrangère qui va permettre la jointure
  KEY Posts_idx (posts_id), -- défini la clé étrangère qui va permettre la jointure
  CONSTRAINT fk_Comment_Users -- nom de la contrainte
  FOREIGN KEY (user_id)-- colonne sur laquelle on a ajouté la clé
  REFERENCES Users (id) -- table et colonne de référence 
  ON DELETE CASCADE  ON UPDATE CASCADE, 
  CONSTRAINT fk_Comments_Posts -- nom de la contrainte
  FOREIGN KEY (posts_id)-- colonne sur laquelle on a ajouté la clé
  REFERENCES Posts (id) -- table et colonne de référence 
  ON DELETE CASCADE  ON UPDATE CASCADE -- défini le comportement lors de la suppression ou modification d'une référence
)ENGINE=InnoDB DEFAULT CHARSET=utf8;--moteur de stokage + utf8 comme jeu de caractères

--création de la table Likes --
DROP TABLE IF EXISTS Likes;
CREATE TABLE Likes(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT , -- numerique entier positif de 4 octets
  user_id INT UNSIGNED NOT NULL  , -- numérique entier positif de 4 octets
  posts_id INT UNSIGNED NOT NULL , -- numérique entier positif de 4 octets
  likes SMALLINT NOT NULL, --numérique entier 2 octet
  PRIMARY KEY (id), -- défini la clé primaire
  KEY userId_idx (user_id), -- défini la clé étrangère qui va permettre la jointure entre table Likes et Users
  KEY Posts_idx (posts_id), -- défini la clé étrangère qui va permettre la jointure entre table Likes et Posts
  CONSTRAINT fk_Likes_Users_id -- nom de la contrainte
  FOREIGN KEY (user_id) -- colonne sur laquelle on a ajouté la clé
  REFERENCES Users (id) -- table et colonne de référence 
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_Likes_Posts_id -- nom de la contrainte
  FOREIGN KEY (posts_id) -- colonne sur laquelle on a ajouté la clé
  REFERENCES  Posts (id) -- table et colonne de référence 
  ON DELETE CASCADE ON UPDATE CASCADE --défini le comportement lors de la suppression ou modification d'une référence
)ENGINE=InnoDB DEFAULT CHARSET=utf8;--moteur de stokage + utf8 comme jeu de caractères