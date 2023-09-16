//// [tests/cases/conformance/externalModules/typeOnly/namespaceImportTypeQuery.ts] ////

//// [a.ts]
class A {}
export type { A };
export class B {};

//// [b.ts]
import * as types from './a';
let A: typeof types.A;
let B: typeof types.B;

let t: typeof types = {
  // error: while you can ask for `typeof types.A`,
  // `typeof types` does not include `A`
  A: undefined as any,
  B: undefined as any,
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
var A;
var B;
var t = {
    // error: while you can ask for `typeof types.A`,
    // `typeof types` does not include `A`
    A: undefined,
    B: undefined,
};
