//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType.ts] ////

//// [a.ts]
export default class A {}

//// [b.ts]
import type from './a';


//// [a.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports["default"] = A;
//// [b.js]
"use strict";
exports.__esModule = true;
