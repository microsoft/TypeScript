//// [tests/cases/conformance/externalModules/typeOnly/namespaceMemberAccess.ts] ////

//// [a.ts]
class A { a!: string }
export type { A };

//// [b.ts]
import * as types from './a';
types.A;
const { A } = types;

//// [a.js]
class A {
    a;
}
export {};
//// [b.js]
import * as types from './a';
types.A;
const { A } = types;
