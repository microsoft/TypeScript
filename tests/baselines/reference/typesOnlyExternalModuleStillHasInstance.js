//// [foo_0.js]
//// [foo_1.js]
var foo0 = require('./foo_0');

// Per 11.2.3, foo_0 should still be "instantiated", albeit with no members
var x = {};
var y = foo0;
