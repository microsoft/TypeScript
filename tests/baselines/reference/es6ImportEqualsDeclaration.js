//// [tests/cases/compiler/es6ImportEqualsDeclaration.ts] ////

//// [server.ts]
var a = 10;
export = a;

//// [client.ts]
import a = require("server");
void a;


//// [server.js]
var a = 10;
module.exports = a;
//// [client.js]
const a = require("server");
void a;
