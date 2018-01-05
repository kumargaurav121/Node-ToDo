const {ObjectID} = require('mongodb');

const {app} = require('./../server/server');
const {User} = require('./../server/models/user');

var id = '5a4efdcb8e2e170e684cd11a';

if(!ObjectID.isValid(id)){
    console.log('Invalid ID');
} else{

    User.findById(id).then((doc) => {
        if(!doc){
            console.log('Unable to find the user');
        } else{
            console.log(doc);
        }
    }, (e) => {
        console.log(e);
    });
    
    
}



