//// [tests/cases/compiler/literalTypeNameAssertionNotTriggered.ts] ////

//// [a.ts]
import x = require("something");
export { x };

//// [b.ts]
import a = require('./a');
declare function f<T>(obj: T, key: keyof T): void;
f(a, "");


//// [a.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var x = require("something");
exports.x = x;
//// [b.js]
"use strict";
exports.__esModule = true;
var a = require("./a");
f(a, "");
