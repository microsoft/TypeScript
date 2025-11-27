//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type from = require('./a');


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
