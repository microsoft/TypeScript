//// [tests/cases/compiler/es6ImportDefaultBinding.ts] ////

//// [es6ImportDefaultBinding_0.ts]

var a = 10;
export = a;

//// [es6ImportDefaultBinding_1.ts]
import defaultBinding from "es6ImportDefaultBinding_0";
var x = defaultBinding;

//// [es6ImportDefaultBinding_0.js]
var a = 10;
module.exports = a;
//// [es6ImportDefaultBinding_1.js]
var x = defaultBinding;
