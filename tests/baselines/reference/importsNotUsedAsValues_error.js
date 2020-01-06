//// [tests/cases/conformance/externalModules/typeOnly/importsNotUsedAsValues_error.ts] ////

//// [a.ts]
export default class {}
export class A {}
export type B = {};

//// [b.ts]
import { A, B } from './a'; // Error
let a: A;
let b: B;
console.log(a, b);

//// [c.ts]
import Default, * as named from './a'; // Error
let a: Default;
let b: named.B;
console.log(a, b);

//// [d.ts]
import Default, { A } from './a';
const a = A;
let b: Default;
console.log(a, b);

//// [e.ts]
import { A, B } from './a'; // noUnusedLocals error only


//// [a.js]
"use strict";
exports.__esModule = true;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
exports["default"] = default_1;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
exports.__esModule = true;
require("./a"); // Error
var a;
var b;
console.log(a, b);
//// [c.js]
"use strict";
exports.__esModule = true;
require("./a"); // Error
var a;
var b;
console.log(a, b);
//// [d.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var a = a_1.A;
var b;
console.log(a, b);
//// [e.js]
"use strict";
exports.__esModule = true;
require("./a"); // noUnusedLocals error only
