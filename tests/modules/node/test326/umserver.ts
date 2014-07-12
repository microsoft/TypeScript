// umserver.ts
///<reference path='node.ts' />
///<reference path='um.ts' />
///<reference path='socketio.ts' />
module http from "http"
module socketio from "socketio"
module um from "um"
        
var app = http.createServer(function (){})
var io:any = socketio.listen(app);
io.sockets.on('connection', function(socket) {
        var fakestdin: IReadableStream = { }
        um.start(fakestdin);
});
