//// [tests/cases/conformance/externalModules/typeOnly/namespaceImportTypeQuery2.ts] ////

//// [z.ts]
interface A {}
export type { A };

//// [a.ts]
import { A } from './z';
const A = 0;
export { A };
export class B {};

//// [b.ts]
import * as types from './a';
let t: typeof types = {
  A: undefined as any, // ok
  B: undefined as any,
}


//// [z.js]
export {};
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
