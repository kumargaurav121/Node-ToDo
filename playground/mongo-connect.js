const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if(err){
        return console.log('Unable to connet to the database');
    }

    console.log('Successfully connected');

    var db = client.db('TodoApp');


    // db.collection('Users').insertOne({
    //     name: 'KG',
    //     age: 25,
    //     location: 'Delhi'
    // }, (err, result) => {

    //     if(err){
    //         return console.log('Unable to insert the data', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 3));

    // });


    db.collection('Users').insertMany([{
        name: 'Deepak',
        age: 25,
        location: 'Delhi'
    }, {
        name: 'Manish',
        age:24,
        location: 'Noida'
    }], (err, result) => {

        if(err){
            return console.log('Unable to Inser Field');
        }

        console.log(JSON.stringify(result.ops, undefined, 3));

    });

    client.close();

});