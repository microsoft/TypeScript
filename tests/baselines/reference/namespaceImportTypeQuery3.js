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
const A = 0;
export { A };
export class B {
}
;
//// [b.js]
let t = {
    A: undefined, // ok
    B: undefined,
};
export {};
