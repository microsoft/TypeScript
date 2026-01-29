//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace2.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export * as a from './a';

//// [c.ts]
import type { a } from './b';
export { a };

//// [d.ts]
import { a } from './c';
new a.A(); // Error


//// [a.js]
export class A {
}
//// [b.js]
import * as a_1 from './a';
export { a_1 as a };
//// [c.js]
export {};
//// [d.js]
new a.A(); // Error
export {};
