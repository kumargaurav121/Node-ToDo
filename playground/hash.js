const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });


var hashedPass = '$2a$10$pquW7FV4nnDlhGYIfbZNSOZYXFDIEPpMrKkLw.5H.vk9XXFqrBxXu';

bcrypt.compare(password, hashedPass, (err, res) => {
    console.log(res);
})

// var data = {
//     id: 10
// }


// var token = jwt.sign(data, 'hello');
// console.log('token', token);

// var decoded = jwt.verify(token, 'hello');
// console.log('decoded', decoded);