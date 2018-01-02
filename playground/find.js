const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if(err){
        return console.log('Unable to connect to DB');
    }

    console.log('Connected to DB');

    var db = client.db('TodoApp');

    // db.collection('Users').find({
    //     _id: new ObjectID('5a4b1fefdd99dd1ffc2b2b3f')
    // }).toArray().then((res) => {
    //     console.log(JSON.stringify(res, undefined, 3));
    // }, (error) =>{
    //     console.log('Unable to fetch', error);
    // });


    db.collection('Users').find().count().then((count) => {
        console.log(`Users Count: ${count}`);
    }, (error) => {
        console.log('Unable to fetch');
    });


    client.close();

});