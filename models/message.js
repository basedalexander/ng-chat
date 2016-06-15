'use strict';

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    message: String,
    created_at: Date
});

messageSchema.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

module.exports = mongoose.model('Message', messageSchema);