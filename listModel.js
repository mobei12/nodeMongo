const connection = require('./dbase.js');
const listSchema = require('./listSchema.js');

let listModel = connection.model('Student', listSchema);

module.exports = listModel;