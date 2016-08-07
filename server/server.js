// librairie
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));

var app = express();
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var config = require('../config');
// permet de parser le corps de la requête 
// pour récupérer les infos facilement
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('superSecret', config.secret); // secret variable

// log les requêtes dans la console
app.use(morgan('dev'));

//Se connecte à la bdd
mongoose.connect(config.database);

//models
var User = require('./models/users');


// ROUTES pour l'api
// =============================================================================
var router = express.Router();

// la racine renvoie app.html
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../dist/templates', '/index.html'));
});
app.use(express.static(__dirname+"/.."));

//route pour register
router.route('/register')

    // créé le user (POST /register)
    .post(function(req, res) {
        
        var user = new User();      
        user.username = req.body.data.username;  
        user.password = req.body.data.password;  
        user.email = req.body.data.email;  

        // save le user et check si il y a des erreurs
        user.saveAsync().then(function (success) {
            res.json({success:true, message: 'user created!'});
        }).catch(function (err) {
      	   	res.status(500);
        		res.send(err);
    		});
        
    });


//route d'authentification
router.post('/authenticate', function(req, res) {

  // find the user (Post /authenticate)
  User.findOne({
    username: req.body.data.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(403);
      res.json({success: false});
    } else if (user) {

      // check si les mot de passes sont les mêmes
      if (user.password != req.body.data.password) {
        res.status(403);
        res.json({success: false});
      } else {

        // créer un token si le user existe
        // et que le mot de passe concorde
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '1d' // token de 24h
        });

        // retourne le token pour le stocker côté client
        res.json({
          success: true,
          token: token
        });
      }   

    }

  });
});

// middleware qui récupère toutes les requêtes après l'authentification
router.use(function(req, res, next) {
  // check le header ou l'url ou dans le corps de la requête pour le token
  var token = req.body.token || req.query.token || req.headers['authorization'];
  // décode le token
  if (token) {

    // vérifie le secret
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // Si ça correpond, on passe après le middleware
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // si il n'y a pas de token
    // On retourne une erreur
    return res.status(403).send();    
    
  }
});

//route pour user
router.route('/user')

    //récupère un User en particulier
    .get(function(req, res) {
    	User.find({username: req.body.data.username}, function(err, user) {
    	res.json(user);
  	})
	});


// Fin des routes -------------------------------

app.use('/', router);

app.listen(config.port);
