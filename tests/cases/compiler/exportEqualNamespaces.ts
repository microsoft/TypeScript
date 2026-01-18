//@module: amd
declare namespace server {
    interface Server extends Object { }
}

interface server {
    (): server.Server;
    startTime: Date;
}
 
var x = 5;
var server = new Date();
export = server;
