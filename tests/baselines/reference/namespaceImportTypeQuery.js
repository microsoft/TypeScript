//// [tests/cases/conformance/externalModules/typeOnly/namespaceImportTypeQuery.ts] ////

//// [a.ts]
class A {}
export type { A };
export class B {};

//// [b.ts]
import * as types from './a';
let A: typeof types.A;
let B: typeof types.B;


//// [a.js]
"use strict";
exports.__esModule = true;
exports.B = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
;
//// [b.js]
"use strict";
exports.__esModule = true;
var A;
var B;
