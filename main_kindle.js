const express = require('express')
//var session = require('cookie-session');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const app = express()
const DOMParser = require('dom-parser')
const parser = new DOMParser()
const port = process.env.PORT || 8080;


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

//page.ejs renvoie sur /upload ; soit fileuploaded.ejs
app.post('/upload', function (req, res) {
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

app.post('/parsed', function (req, res) {
    // console.log(__dirname + '/Notes-unparsed/' + 'Notes Sapiens.html')
    var all_note_files = fs.readdirSync(__dirname + '/Notes-unparsed/');
    // for (var i = 0; i < all_note_files.length; i++) {
        // console.log(all_note_files[i])
    // }

    all_note_files.forEach(function (elem) {
        fs.readFile(__dirname + '/Notes-unparsed/' + elem, 'utf8', function (err, data) {
            if (err) throw err;

            //transformer le texte en objet html
            const valueHTML = parser.parseFromString(data);
            const tab = valueHTML.getElementsByClassName("noteText");
            var vocab = tab
            var quotes = []
            for (i = 0; i < vocab.length; i++) {
                // si la note fait plus de 5 mots, on considère que c'est une citation
                if (vocab[i].innerHTML.split(" ").length > 5) {
                    quotes.push(vocab[i])
                    vocab.splice(i, 1);
                    i--
                }
            }
            /*for (i = 0; i < vocab.length; i++){
                console.log("vocab[" + i + "].innerHTML : " + vocab[i].innerHTML)
            }
            for (i = 0; i < quotes.length; i++){
                console.log("quotes[" + i + "].innerHTML : " + quotes[i].innerHTML)
            }*/
            res.status(200);
            res.render('note_parsed.ejs', { quotesejs: quotes, vocabejs: vocab });
        });
    })

})


app.listen(port);