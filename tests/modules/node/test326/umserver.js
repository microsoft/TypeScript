var http = require("http");

var socketio = require("./socketio");

var um = require("./um");

var app = http.createServer(function() {
}); 
var io = socketio.listen(app); 
io.sockets.on('connection', function(socket) {
    var fakestdin = {
    }; 
    um.start(fakestdin); 
}); 
