//// [tests/cases/conformance/externalModules/typeOnly/namespaceImportTypeQuery4.ts] ////

//// [a.ts]
import type { A } from './z'; // unresolved
type A = 0;
export { A };
export class B {};

//// [b.ts]
import * as types from './a';
let t: typeof types = {
  A: undefined as any, // error
  B: undefined as any,
}


//// [a.js]
export class B {
}
;
//// [b.js]
let t = {
    A: undefined, // error
    B: undefined,
};
export {};
