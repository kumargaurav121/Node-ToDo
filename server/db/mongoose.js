const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://gaurav121:Gaurav!2345@ds239587.mlab.com:39587/todoappapp` || 'mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};