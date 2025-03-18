//// [tests/cases/compiler/exportEqualNamespaces.ts] ////

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
"use strict";
var x = 5;
var server = new Date();
module.exports = server;
