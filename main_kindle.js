var express = require('express');
//var session = require('cookie-session');
var multer = require('multer');
var upload = multer();
//var upload = multer({ dest: 'uploads/' });
const app = express();

//var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(session({secret: 'todotopsecret'}));

app.get('/', function (req, res) {
    res.render('page.ejs');
})

app.post('/upload', upload.none(), function (req, res, next) {
    res.render('page_upload.ejs');
    console.log(req.file); 
    console.log(req.body); 
})
//un fichier ne peut pas être passé en GET, qui correspond à l'encodage de texte dans l'URL. On utilise donc POST

// aller voir https://scotch.io/tutorials/express-file-uploads-with-multer

app.listen(8080);