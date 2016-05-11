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

app.get('/detail/:brand', function(req,res){
    res.type('text/html');
    console.log(req.params.brand);
    var found = synth.getSynth(req.params.brand);
    if (!found) {
        found = {brand: req.params.brand};
    }
    console.log(found);
    res.render('detail', {synth: found} );      
});


app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/detail', function(req,res){
    res.type('text/html');
    var found = synth.getSynth( req.body.search_term);
    
    res.render('detail', {synth: found} );    
});


app.post('/search', function(req,res){
    res.type('text/html');
    
    var found = synth.getSynth( req.body.search_term.toLowerCase());
    
    console.log(found);
    if (found) {
        res.render('search', {synth: found});
    } else {
        res.render('searchfail');
    }
    
});
    

app.post('/add', function(req,res) {
    res.type('text/html');
    var newSynth = {"brand":req.body.brand, "model":req.body.model, "price":req.body.price};
    var result = synth.add(newSynth);
    if (result.added) {
        res.render('add', {result: result.total});
        console.log (result.total);
    } else {
        res.render('updated', {result: result.total});
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = synth.delete(req.body.brand);
    if (result.deleted) {
        res.render('deleted', {result: result.total});
        console.log (result.total);
    } else {
        res.send(req.body.brand + ' not found' + back_link);
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