//// [foo_1.ts]
import foo = require("vs/foo_0");
import fum = require("vs/fum");
var z = foo.x + fum.y;


//// [foo_0.js]
exports.x;
//// [foo_1.js]
var foo = require("vs/foo_0");
var fum = require("vs/fum");
var z = foo.x + fum.y;
