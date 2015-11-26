//// [exportEqualNamespaces.ts]
declare module server {
    interface Server extends Object { }
}

interface server {
    (): server.Server;
    startTime: Date;
}
 
var x = 5;
var server = new Date();
export = server;


//// [exportEqualNamespaces.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var x = 5;
    var server = new Date();
    return server;
});
