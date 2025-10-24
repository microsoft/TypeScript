//// [tests/cases/compiler/es6ImportEqualsDeclaration.ts] ////

//// [server.ts]
var a = 10;
export = a;

//// [client.ts]
import a = require("server");

//// [client.js]
export {};
