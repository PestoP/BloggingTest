// librairie
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));

var app = express();

// Http port pour la connexion
const HTTP_PORT = '3000';

// permet de parser le corps de la requête 
// pour récupérer les infos facilement
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Se connecte à la bdd
mongoose.connect('mongodb://localhost/blaug');

//models
var User = require('./models/users');


// ROUTES pour l'api
// =============================================================================
var router = express.Router();

// middleware qui récupère toutes les requêtes
router.use(function(req, res, next) {
		console.log('requêtes reçu')
    next();
});

// la racine renvoie app.html
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../dist/templates', '/app.html'));
});

//route pour user
router.route('/user')

    // créé le user (POST /user)
    .post(function(req, res) {
        
        var user = new User();      
        user.username = req.body.username;  
        user.password = req.body.password;  

        // save le user et check si il y a des erreurs
        user.saveAsync().then(function (success) {
            res.json({ message: 'user created!' });
        }).catch(function (err) {
        		res.send(err);
    		});
        
    })

    //récupère un User en particulier
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
						}
            res.json(users);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use(express.static(__dirname+"/.."));

app.listen(HTTP_PORT);
