//// [tests/cases/conformance/externalModules/typeOnly/namespaceMemberAccess.ts] ////

//// [a.ts]
class A { a!: string }
export type { A };

//// [b.ts]
import * as types from './a';
types.A;
const { A } = types;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./a");
types.A;
var A = types.A;
