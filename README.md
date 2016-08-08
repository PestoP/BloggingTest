# Blaug

Blaug est une application de blogging permettant de devenir auteur d'article ainsi que de suivre d'autres auteurs.

### Technologies

* [AngularJs] - Framework front-end

* [Express] - Framework back-end

* [node.js] - Serveur

* [Gulp] - Streaming Build System

* [MongoDB] - Base de données

* [Pug] - Node Template Engine

* [Sass] - Syntactically Awesome Stylesheets

* [Twitter Bootstrap] - Framework CSS

* [Angular Ui-Router] - Routes for angular

### Installation dev

 L'application a besoin que [Node.js](https://nodejs.org/) et [MongoDB](https://www.mongodb.com) soit installé pour démarrer.

- MongoDB

	Installer MongoDB puis aller dans le dossier :
	C:\MongoDB\Server\3.2\bin et exécuter mongod avec un terminal de commande

- Installation des dépendences et démarrage serveur : 

 	Se placer à la racine du projet : 
	
	```sh
	$ npm install
	$ node server/server.js
	```

- Configuration des sources : build la tâche gulp 'default' ('gulp default' dans le terminal node)

- Se connecter à localhost:3000


### Développé

  - Serveur : Authentification

  - Serveur : Connexion à la base de donnée

  - Mise en page de la page d'accueil

  - Mise en page du login

  - Mise en page du profil
  
  - Mise en page d'un article


### A développer

  - Enregistrement des données en base

  - Ajout d'un article

  - Gestion des pages

  - Gestion des tags

  - Gestion des catégories

  - Panel d'administration

  - Auteurs favoris

  - Paramètres de compte


[AngularJs]: <http://angularjs.org>

[Express]: <http://expressjs.com>

[node.js]: <http://nodejs.org>

[Gulp]: <http://gulpjs.com>

[MongoDB]: <https://www.mongodb.com>

[Pug]: <http://jade-lang.com>

[Sass]: <http://sass-lang.com>

[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>

[Angular Ui-Router]: <https://github.com/angular-ui/ui-router>