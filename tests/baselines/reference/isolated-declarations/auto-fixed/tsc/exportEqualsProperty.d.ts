//// [tests/cases/compiler/exportEqualsProperty.ts] ////

//// [index.ts]
/// <reference path="declarations.d.ts" />
import { X } from "foobar";
import X2 = require("foobarx");
const x: X = X;
const x2: X2 = X2;

import B = require("./a");
const b: B = new B(B.b);

import fooLength = require("./b");
fooLength + 1;

//// [declarations.d.ts]
// This test is just like exportDefaultProperty, but with `export =`.

declare namespace foo.bar {
    export type X = number;
    export const X: number;
}

declare module "foobar" {
    export = foo.bar;
}

declare module "foobarx" {
    export = foo.bar.X;
}

//// [a.ts]
namespace A {
    export class B { constructor(b: number) {} }
    export namespace B { export const b: number = 0; }
}
export = A.B;

//// [b.ts]
export = "foo".length;


/// [Declarations] ////



//// [a.d.ts]
declare namespace A {
    class B {
        constructor(b: number);
    }
    namespace B {
        const b: number;
    }
}
declare const _default: typeof A.B;
export = _default;

//// [b.d.ts]
declare const _default: number;
export = _default;

//// [index.d.ts]
/// <reference path="declarations.d.ts" />
export {};
