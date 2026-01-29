//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration_moduleSpecifier.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type { A } from './a';

//// [c.ts]
import { A } from './b';
declare const a: A;
new A();


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
new A();
export {};
