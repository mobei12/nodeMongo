const mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    'name': String
})

module.exports = listSchema;