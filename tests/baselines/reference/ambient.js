//// [tests/cases/conformance/externalModules/typeOnly/ambient.ts] ////

//// [a.ts]
export class A { a!: string }

//// [b.ts]
import type { A } from './a';
declare class B extends A {}
declare namespace ns {
  class C extends A {}
}


//// [a.js]
export class A {
    a;
}
//// [b.js]
export {};
