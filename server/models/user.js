

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = function() {

    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    })

};


userSchema.methods.toJSON = function() {

    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['email', '_id']);

};


userSchema.statics.findByToken = function (token) {

    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc');
    } catch(e){
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else{
        next();
    }
});


userSchema.statics.findByCredential = function(email, password) {

    var User = this;

    return User.findOne({email}).then((user) => {

        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            var pass = user.password;
            bcrypt.compare(password, pass, (err, res) => {
                if(res){
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
       
    })

};



var User = mongoose.model('Users', userSchema);


module.exports = {User};