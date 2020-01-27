//// [tests/cases/conformance/externalModules/typeOnly/implementsClause.ts] ////

//// [types.ts]
export interface Component {}

//// [index.ts]
import type * as types from './types';
class C implements types.Component {}

//// [types.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
