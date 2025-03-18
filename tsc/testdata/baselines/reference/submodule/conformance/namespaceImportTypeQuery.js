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
class A {
}
class B {
}
exports.B = B;
;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let A;
let B;
let t = {
    A: undefined,
    B: undefined,
};
