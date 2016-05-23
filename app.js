var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');



var dbConnection = mongoose.createConnection(config.MONGO_URI + config.MONGO_COLLECTION);
autoIncrement.initialize(dbConnection);

var userSchema = require('./models/user-schema');

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'user_id',
    startAt: 1,
    incrementBy: 1
});

var User = dbConnection.model('User', userSchema);

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/scripts", express.static(__dirname + "/node_modules/"));

var routes = require('./routes/routes.js')(app);

io.on('connection', function (socket) {
    socket.on('chat_message', function (msg) {
        var newMessage = new Message(msg);
        newMessage.save(function (err) {
            if (err) { return console.error(err.message); }
            io.emit("chat_message", msg);
        });
    });
});

dbConnection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

server.listen(3000, function () {
    console.log('Listening on port %s...', server.address().port);
});