const mongoose = require('mongoose'); // colocando mongoose no arquivo

mongoose.connect('mongodb://localhost/noderest'); 
mongoose.Promise = global.Promise;

module.exports = mongoose; // exportando o mongoose