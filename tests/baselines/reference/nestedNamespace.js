//// [tests/cases/conformance/externalModules/typeOnly/nestedNamespace.ts] ////

//// [a.ts]
export namespace types {
  export class A {}
}

//// [b.ts]
import type * as a from './a';
interface B extends a.types.A {}


//// [a.js]
export var types;
(function (types) {
    class A {
    }
    types.A = A;
})(types || (types = {}));
//// [b.js]
export {};
