const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mongo_rui = `mongodb://todoappapp:TODOTODO@ds239587.mlab.com:39587/todoappapp`;
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};