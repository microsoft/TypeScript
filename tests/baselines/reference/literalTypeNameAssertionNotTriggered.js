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
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x = require("something");
exports.x = x;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = require("./a");
f(a, "");
