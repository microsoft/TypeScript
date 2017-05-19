// @module: commonjs
// @Filename: foo1.ts
class x{}

export = x; 

// @Filename: foo2.ts
import foo1 = require('./foo1');
var x = foo1;
class y extends x {}
