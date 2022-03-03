//// [tests/cases/conformance/externalModules/typeOnly/importsNotUsedAsValues_error.ts] ////

//// [a.ts]
export default class {}
export class A {}
export type B = {};
export const enum C { One, Two }

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

//// [f.ts]
import { C } from './a';
import type { C as D } from './a';
C.One;
let c: D = C.Two;
let d: D.Two = C.Two;
console.log(c, d);

//// [g.ts]
import { C } from './a';
let c: C;
let d: C.Two;
console.log(c, d);

//// [h.ts]
class H {}
export = H;

//// [i.ts]
import H = require('./h'); // Error
let h: H = {};
console.log(h);

//// [j.ts]
import H = require('./h'); // noUnusedLocals error only

//// [k.ts]
const enum K { One, Two }
export = K;

//// [l.ts]
import K = require('./k');
K.One;

//// [j.ts]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207

//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
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
//// [f.js]
"use strict";
exports.__esModule = true;
require("./a");
0 /* One */;
var c = 1 /* Two */;
var d = 1 /* Two */;
console.log(c, d);
//// [g.js]
"use strict";
exports.__esModule = true;
require("./a");
var c;
var d;
console.log(c, d);
//// [h.js]
"use strict";
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
module.exports = H;
//// [i.js]
"use strict";
exports.__esModule = true;
var h = {};
console.log(h);
//// [j.js]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
//// [k.js]
"use strict";
exports.__esModule = true;
//// [l.js]
"use strict";
exports.__esModule = true;
0 /* One */;
