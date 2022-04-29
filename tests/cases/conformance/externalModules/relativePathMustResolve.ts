// @module: commonjs
// @Filename: foo_0.ts
export var x = 42;

// @Filename: foo_1.ts
import foo = require('./test/foo');
var z = foo.x + 10;
