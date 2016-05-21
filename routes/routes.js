'use strict';

var mongoose = require('mongoose');
var Message = require('../models/message-model');

var appRouter = function (app) {
    app.get('/fetch', function (req, res) {
        Message.find( {}, function(error, messages) {
            if(error) {
                return res.status(400).send(error);
            }
            return res.send(messages);
        });
    })
};

module.exports = appRouter;