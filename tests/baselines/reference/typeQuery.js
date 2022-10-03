//// [tests/cases/conformance/externalModules/typeOnly/typeQuery.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import type { A } from './a';
let AConstructor: typeof A;


//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
exports.__esModule = true;
var AConstructor;
