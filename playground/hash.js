const jwt = require('jsonwebtoken');

var data = {
    id: 10
}


var token = jwt.sign(data, 'hello');
console.log('token', token);

var decoded = jwt.verify(token, 'hello');
console.log('decoded', decoded);