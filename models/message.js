'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    author_id: Number,
    message: String,
    created_at: Date
});

messageSchema.pre('save', function (next) {
    var currentDate = new Date();

    if (!this.created_at) {
        this.created_at = currentDate;
    }
});

module.exports = mongoose.model('Message', messageSchema);