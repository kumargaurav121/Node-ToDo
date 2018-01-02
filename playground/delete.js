const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (error, client) => {

    if(error){
        return console.log('Unable to connect to DB');
    }

    console.log('Connected Successfully');


    var db = client.db('TodoApp');

    // DELETE MANY
    // db.collection('Users').deleteMany({name: 'Manish'}).then((res) => {
    //     console.log(res);
    // });


    //FIND ONE AND DELETE

    // var id = new ObjectID();

    // db.collection('Users').findOne({name: 'Deepak'}).then((res) => {
    //     console.log(res);
    //     id = res._id;
    //     console.log(id);
    // });

    // db.collection('Users').find({
    //     _id: new ObjectID(id)
    // }).toArray().then((res) => {
    //     console.log(res);
    //     id = res._id;
    //     console.log(id);
    // });


    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a4b25f2d169a018f455e53c')
    }).then((res) => {
        //console.log(typeof id);
        console.log(res);
    }, (errLog) => {
        console.log('Unable to Delte');
    });


    //client.close();

});