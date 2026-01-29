//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * from './a';

//// [c.ts]
export type * as ns from './a';

//// [d.ts]
import { A } from './b';
A;

//// [e.ts]
import { ns } from './c';
ns.A;


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
export {};
//// [d.js]
A;
export {};
//// [e.js]
ns.A;
export {};


//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
export type * from './a';
//// [c.d.ts]
export type * as ns from './a';
//// [d.d.ts]
export {};
//// [e.d.ts]
export {};
