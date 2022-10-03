//// [tests/cases/conformance/externalModules/typeOnly/implementsClause.ts] ////

//// [types.ts]
export interface Component {}

//// [ns.ts]
import type * as types from './types';
export { types };

//// [index.ts]
import type * as types from './types';
import * as nestedNamespace from './ns';

class C implements types.Component {}
class D implements nestedNamespace.types.Component {}


//// [types.js]
"use strict";
exports.__esModule = true;
//// [ns.js]
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
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
