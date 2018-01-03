const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

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





app.listen(3000, () => {
    console.log('Starting the app');
});


module.exports = {app};


