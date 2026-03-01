//// [tests/cases/conformance/externalModules/typeOnly/namespaceImportTypeQuery3.ts] ////

//// [a.ts]
import type { A } from './z'; // unresolved
const A = 0;
export { A };
export class B {};

//// [b.ts]
import * as types from './a';
let t: typeof types = {
  A: undefined as any, // ok
  B: undefined as any,
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
const A = 0;
exports.A = A;
class B {
}
exports.B = B;
;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let t = {
    A: undefined, // ok
    B: undefined,
};
