//// [tests/cases/conformance/externalModules/typeOnly/importClause_namedImports.ts] ////

//// [abc.ts]
export class A {}
export type B  = { b: string };
export const C = "";

//// [d.ts]
import type { A, B, C } from './abc';
new A();
declare let a: A;
declare let b: B;
b.b;
const c = { A };


//// [abc.js]
export class A {
}
export const C = "";
//// [d.js]
new A();
b.b;
const c = { A };
export {};
