//// [tests/cases/conformance/externalModules/typeOnly/importClause_default.ts] ////

//// [a.ts]
export default class A { a!: string }

//// [b.ts]
import type A from './a';
new A();
let a: A = { a: '' };
let b = { A };


//// [a.js]
export default class A {
    a;
}
//// [b.js]
new A();
let a = { a: '' };
let b = { A };
export {};
