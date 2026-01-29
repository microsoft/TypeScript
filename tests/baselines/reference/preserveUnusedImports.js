//// [tests/cases/compiler/preserveUnusedImports.ts] ////

//// [a.ts]
export type A = {};

//// [b.ts]
export class B {}

//// [c.ts]
import { A } from './a';
import { B } from './b';

let b: B;


//// [a.js]
export {};
//// [b.js]
export class B {
}
//// [c.js]
let b;
export {};
