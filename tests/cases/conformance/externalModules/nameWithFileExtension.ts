// @module: commonjs
// @Filename: foo_0.ts
export var foo = 42;

// @Filename: foo_1.ts
import foo = require('./foo_0.js');
var x = foo.foo + 42;
