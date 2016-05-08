var express = require("express");
var app = express();
var synth = require('./lib/synths.js');

var back_link = "<p><a href='/'>Back</a>";


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));



var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );


app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {synth: synth.getAll()});    
});

app.get('/detail', function(req,res){
    res.type('text/html');
    res.render('detail', {synth: synth.getSynth()} );    
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.search_term.toLowerCase()+ '<br>';
    var found = synth.getSynth( req.body.search_term.toLowerCase());
    
    
    var synthmodel = found.model + ' ';
    
    if (found) {
        res.send(header + synthmodel + "Price: " + found.price);
    } else {
        res.send(header + "No such synth exists in our inventory.");
    }
    
});
    

app.post('/add', function(req,res) {
    res.type('text/html');
    var newSynth = {"brand":req.body.brand, "model":req.body.model, "price":req.body.price}
    var result = synth.add(newSynth);
    if (result.added) {
        res.send("Added: " + req.body.brand + "<br>New total = " + result.total + back_link);
    } else {
        res.send("Updated: " + req.body.brand + back_link);
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = synth.delete(req.body.brand);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.brand + '<br>New total = ' + result.total + back_link);
    } else {
        res.send(req.body.brand + " not found" + back_link);
    }
});


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});