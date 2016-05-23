'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    message: String
});

module.exports = messageSchema;