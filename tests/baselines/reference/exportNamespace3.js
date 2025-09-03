//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
export * as a from './b';

//// [d.ts]
import { a } from './c';
new a.A(); // Error


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
import * as a_1 from './b';
export { a_1 as a };
//// [d.js]
import { a } from './c';
new a.A(); // Error
