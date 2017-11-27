var multer = require('multer')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var result = new Array()

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, '/tmp/');
    },
    filename: function(req, file, callback){
        callback(null, new Date().toISOString() + "-" + file.originalname)
    }
});

var upload = multer({storage: storage})

app.post('/submit', upload.single('myFile'), function(req, res){
    console.log(req.file);
    result = { "size" : req.file.size };
    res.redirect('/filesize');
}) 

app.get('/filesize', function(req, res){
    res.json(result)
})

var server = app.listen(process.env.PORT || port, function(){
    console.log("Server started");
})