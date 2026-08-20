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
const x = require("something");
exports.x = x;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("./a");
f(a, "");
