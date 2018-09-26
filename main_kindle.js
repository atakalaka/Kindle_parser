const express = require('express')
const multer = require('multer')
const fileUpload = require('express-fileupload');
const upload = multer()
const app = express()
const port = process.env.PORT || 8080;





app.use(fileUpload())
app.use(express.static(__dirname + '/public'))
console.log(__dirname)

app.get('/', function (req, res) {
    console.log(__dirname)
    console.log(__dirname + '/public') // ajouter app use pour dire ou se trouve les static de la page. Ici on vas chercher dans le dossier public
    res.render('page.ejs')
})

app.get('/test', function (req, res) {
    res.send(req.query.var1)
    console.log('Voila ma couille')
})

app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.')
    let sampleFile = req.files.sampleFile
    console.log(__dirname)
    sampleFile.mv(__dirname + '/Notes-unparsed/' + req.files.sampleFile.name, function(err) {
     if (err)
        return res.status(500).send(err)
        res.send('File uploaded!')
    })
})

app.listen(port);