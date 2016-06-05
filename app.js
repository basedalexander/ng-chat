var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');

var User = require('./models/user');
var Message = require('./models/message');

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/scripts", express.static(__dirname + "/node_modules/"));

var routes = require('./routes/routes.js')(app);

io.on('connection', function (socket) {
    
    socket.on('register', function (credentials) {
        User.find({
            username: credentials.username
        },function (err, user) {
            if (user === null) {
                var newUser = new User({
                    username: credentials.username,
                    password: credentials.password
                });

                newUser.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    });

    socket.on('chat_message', function (msg) {
        var newMessage = new Message(msg);

        newMessage.save(function (err) {
            if (err) { return console.error(err.message); }
            io.emit("chat_message", msg);
        });
    });

});

mongoose.connect(config.MONGO_URI + config.MONGO_COLLECTION);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

server.listen(3000, function () {
    console.log('Listening on port %s...', server.address().port);
});