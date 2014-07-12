//// [foo2.ts]
import foo1 = require('./foo1');
var x: number = foo1.b();

//// [foo1.js]
module.exports = M1;
//// [foo2.js]
var foo1 = require('./foo1');
var x = foo1.b();
