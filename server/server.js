const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    //res.send(req.body);

    var newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then((r) => {
        res.status(200).send(r);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Todo.find().then((todos) => {
//     console.log(todos);
// });


app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.status(200).send({todos});
    }, (e) => {
        res.status(400).send('Page not found!');
    });

});


app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(400).send('Not a valid ID');
    }

    Todo.findById(id).then((todo) => {

        if(!todo){
            return res.status(404).send();
        }

        res.status(200).send({todo});

    }, (e) => {
        res.status(404).send();
    })

});



app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send('ID is not Valid');
    }

    Todo.findByIdAndRemove(id).then((todo) => {

        if(!todo){
            return res.status(404).send('ID Not Found');
        }

        res.status(200).send({todo});

    }, (e) => {
        res.status(400).send('ID Not Found0');
    });

});





app.listen(port, () => {
    console.log(`Starting the app on ${port}`);
});


module.exports = {app};


