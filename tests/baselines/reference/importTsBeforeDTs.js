//// [foo_0.js]
exports.y = 42;
//// [foo_1.js]
var foo = require("./foo_0");
var z1 = foo.x + 10;
var z2 = foo.y + 10;
