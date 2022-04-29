// This test is just like exportDefaultProperty, but with `export =`.

// @Filename: declarations.d.ts
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

// @Filename: a.ts
namespace A {
    export class B { constructor(b: number) {} }
    export namespace B { export const b: number = 0; }
}
export = A.B;

// @Filename: b.ts
export = "foo".length;

// @Filename: index.ts
/// <reference path="declarations.d.ts" />
import { X } from "foobar";
import X2 = require("foobarx");
const x: X = X;
const x2: X2 = X2;

import B = require("./a");
const b: B = new B(B.b);

import fooLength = require("./b");
fooLength + 1;
