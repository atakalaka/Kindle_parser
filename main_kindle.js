const express = require('express')
//var session = require('cookie-session');
const multer = require('multer')

const upload = multer()
//var upload = multer({ dest: 'uploads/' });
const app = express()

const port = process.env.PORT || 8080;

//var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
// var urlencodedParser = bodyParser.urlencoded({ extended: false });


function generateHTML (res) {
    const titi = {
        status: '',
        error: '',
        successs: ''
    }

    if (res === 'salut')
    {
        titi.status = 200
        titi.successs = 'Tout a fonctionné'
        titi.error = null
    } else {
        titi.status = 404
        titi.successs = null
        titi.error = 'DATA NOT FOUND'
    }
    return (titi)
}

//app.use(session({secret: 'todotopsecret'}));

app.get('/', function (req, res) {
    console.log(req)
    res.render('page.ejs')
})

app.get('/test', function (req, res) {
    const toto = generateHTML(req.query.var1)
    res.send(toto)
    console.log('Voila ma couille')
})

app.post('/upload', upload.none(), function (req, res, next) {
    res.render('page_upload.ejs')
    console.log(req.file)
    console.log(req.body)
})
//un fichier ne peut pas être passé en GET, qui correspond à l'encodage de texte dans l'URL. On utilise donc POST
// aller voir https://scotch.io/tutorials/express-file-uploads-with-multer







app.listen(port);