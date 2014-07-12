//// [foo_1.ts]
import foo = require('./test/foo_0');
var x = foo.foo + 42;


//// [foo_0.js]
exports.foo = 42;
//// [foo_1.js]
var foo = require('./test/foo_0');
var x = foo.foo + 42;
