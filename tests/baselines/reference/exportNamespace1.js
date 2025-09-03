//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
export * from './b';

//// [d.ts]
import { A } from './c';
new A(); // Error


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
export * from './b';
//// [d.js]
new A(); // Error
export {};
