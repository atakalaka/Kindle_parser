const express = require('express')
//var session = require('cookie-session');
const multer = require('multer')

const fs = require('fs')

const fileUpload = require('express-fileupload');

const upload = multer()

const app = express()

const DOMParser = require('dom-parser')

const parser = new DOMParser()

const port = process.env.PORT || 8080;


//var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

function generateHTML(res) {
    const titi = {
        status: '',
        error: '',
        successs: ''
    }

    if (res === 'salut') {
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

app.use(fileUpload());

app.get('/', function (req, res) {
    app.use(express.static(__dirname + '/public')); // ajouter app use pour dire ou se trouve les static de la page. Ici on vas chercher dans le dossier public
    res.render('page.ejs')
})

app.post('/parsed', function (req, res) {
    console.log(__dirname + '/Notes-unparsed/' + 'Notes Sapiens.html')
    fs.readFile(__dirname + '/Notes-unparsed/' + 'Notes Sapiens.html', 'utf8', function (err, data) {
        if (err) throw err;

         //transformer le texte en objet html
        const valueHTML = parser.parseFromString(data, 'text/html')
        const tab = valueHTML.getElementsByClassName('noteText')
        console.log(tab)//marche po
        // res.send(tab[0])
    });
})



app.get('/test', function (req, res) {
    const toto = generateHTML(req.query.var1)
})

app.post('/upload', function (req, res) {
    // console.log(req)
    // console.log(req.read)
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file_link;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/Notes-unparsed/' + sampleFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('fileuploaded.ejs');
    })
})



app.listen(port);