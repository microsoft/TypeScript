//// [foo_1.js]
//// [foo_0.js]
exports.x = 42;
//// [foo_2.js]
/// <reference path="foo_1.ts"/>
var foo = require("vs/foo_0");
var z1 = foo.x + 10;
var z2 = foo.y() + 10;
