//// [tests/cases/conformance/externalModules/typeOnly/importEquals3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as a from './a';
import A = a.A; // Error
import aa = a;  // Error

const x = 0;
export { a, A, x };

//// [c.ts]
import * as b from './b';
import A = b.a.A; // Error
import AA = b.A; // Error

import x = b.x;
console.log(x);


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.A = void 0;
var A = a.A; // Error
exports.A = A;
var x = 0;
exports.x = x;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = require("./b");
var x = b.x;
console.log(x);
