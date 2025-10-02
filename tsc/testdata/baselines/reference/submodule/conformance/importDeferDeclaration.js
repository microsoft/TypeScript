//// [tests/cases/conformance/importDefer/importDeferDeclaration.ts] ////

//// [a.ts]
export interface Foo {
  x: number;
}

//// [b.ts]
import defer * as ns from "./a.js";

export type X = { foo: ns.Foo };


//// [a.js]
export {};
//// [b.js]
 * as;
ns;
from;
"./a.js";
export {};


//// [a.d.ts]
export interface Foo {
    x: number;
}
//// [b.d.ts]
export type X = {
    foo: ns.Foo;
};
