const express = require('express')
//var session = require('cookie-session');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const app = express()
const DOMParser = require('dom-parser')
const parser = new DOMParser()
const port = process.env.PORT || 8080;


//app.use(session({secret: 'todotopsecret'}));

app.use(fileUpload());

app.get('/', function (req, res) {
    app.use(express.static(__dirname + '/public')); // ajouter app use pour dire ou se trouve les static de la page. Ici on vas chercher dans le dossier public
    res.render('page.ejs') //page.ejs renvoie sur /upload
})


app.post('/upload', function (req, res) {
    // var vocab = {};
    // var quotes = [];
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.file_link;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/Notes-unparsed/' + sampleFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.render('fileuploaded.ejs');
    })

    fs.readFile(__dirname + '/Notes-unparsed/' + sampleFile.name, 'utf8', function (err, data) {
        if (err) throw err;
        //transformer le texte en objet html
        const valueHTML = parser.parseFromString(data);
        const tab = valueHTML.getElementsByClassName("noteText");
        var vocab = tab;
        var quotes = [];
        for (let j = 0; j < vocab.length; j++) {
            // si la note fait plus de 5 mots, on considère que c'est une citation
            if (vocab[j].innerHTML.split(" ").length > 5) {
                quotes.push(vocab[j])
                vocab.splice(j, 1);
                j--
            }
        }
        res.status(200);
        res.render('note_parsed.ejs', { quotesejs: quotes, vocabejs: vocab });
    })
})

app.listen(port);