//// [foo3.ts]
import foo2 = require('./foo2');
var x = foo2(); // should be boolean

//// [foo1.js]
function x() {
    return true;
}
exports.x = x;
//// [foo2.js]
var foo1 = require('./foo1');
var x = foo1.x;
module.exports = x;
//// [foo3.js]
var foo2 = require('./foo2');
var x = foo2(); // should be boolean
