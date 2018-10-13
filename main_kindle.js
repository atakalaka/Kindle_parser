const express = require('express')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload');
const app = express()
const DOMParser = require('dom-parser')
const parser = new DOMParser()
const port = process.env.PORT || 8080;
//var session = require('cookie-session');
// const lib = require('./server/module') //code de Gautier

//app.use(session({secret: 'todotopsecret'}));

app.set('view engine', 'ejs') //permet de ne pas ecrire l'extension "ejs"

app.use(fileUpload());
app.use('/assets', express.static('public')) //crée un alias de public qui permet d'aller chercher dans public avec les doc ejs


// Routes
app.get('/', function (req, res) {
    res.render('page.ejs') //page.ejs renvoie sur /upload
})


app.post('/upload', function (req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.file_link;

    if (sampleFile) {
        sampleFile.mv(__dirname + '/Notes-unparsed/' + sampleFile.name, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        })

        fs.readFile(__dirname + '/Notes-unparsed/' + sampleFile.name, 'utf8', function (err, data) {
            if (err) { return res.status(400).send("No files found on the server") }
            //transformer le texte en objet html
            const valueHTML = parser.parseFromString(data);
            const tab_words = valueHTML.getElementsByClassName("noteText");
            const title = valueHTML.getElementsByClassName("bookTitle"); //charge le titre du livre 
            var vocab = tab_words;
            var quotes = [];
            for (let j = 0; j < vocab.length; j++) {
                // si la note fait plus de 6 mots, on considère que c'est une citation
                if (vocab[j].innerHTML.split(" ").length > 6) {
                    quotes.push(vocab[j])
                    vocab.splice(j, 1);
                    j--
                }
            }
            res.status(200);
            res.render('note_parsed.ejs', {
                quotesejs: quotes,
                vocabejs: vocab,
                titleejs: title
            });
        })
        fs.unlinkSync(__dirname + '/Notes-unparsed/' + sampleFile.name)//supprime le fichier une fois affiché
    } else {
        return res.status(400).send('No files were uploaded.')
    }
})

app.get('*', function (req, res) {
    res.status(404).render('404notfound.ejs')
});


app.listen(port);