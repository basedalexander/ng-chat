var express = require('express');
var path = require('path');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

var routes = require('./routes/routes.js')(app);

io.on('connection', function (socket) {
    socket.on('chat_message', function (msg) {
        io.emit('chat_message');
    })
})

server.listen(3000, function () {
    console.log('Listening on port %s...', server.address().port);
});