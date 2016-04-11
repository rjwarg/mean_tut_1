var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

/*app.get('/', function(req,res){
 res.send('Hello world from server.js');
 }); */
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req,res) {
    console.log('I received a get request');
    db.contactlist.find(function (err, docs) {

        console.log(docs);
        res.json(docs);
    })
});
app.post('/contactlist', function(req,res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    })
});

app.delete('/contactlist/:id', function(req,res){
    var id = req.params.id;
    console.log('remove: ' + id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
        if(doc) {
            console.log('remove with objectid ' + doc);
            res.json(doc);
        }
        else{
            db.contactlist.remove({_id: id}, function(err,doc){
                console.log('remove with string id ' + doc);
                res.json(doc);
            });
        }
    });

});

app.get('/contactlist/:id', function(req,res) {
    console.log('I received an edit(get) request');
    var id = req.params.id;
    console.log('editing id = ' + id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)},function (err, doc) {
        console.log('Error ' + err);

        console.log(doc);
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req,res) {

    var id = req.params.id;
    console.log('I received a new edit(put) request');
    console.log('editing id = ' + id);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function(err, doc){
            res.json(doc);

    });
});

app.listen(3000);
console.log("listening on port 3000");