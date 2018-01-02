const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (error, client) => {

    if(error){
        return console.log('Unable to connect to DB');
    }

    console.log('Connected Successfully');


    var db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a4b215621a4a722c407edef')
    }, {
        $set: {
            location: 'Noida'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    }, (errLog) => {
        console.log('Unable to Delte');
    });


    client.close();

});