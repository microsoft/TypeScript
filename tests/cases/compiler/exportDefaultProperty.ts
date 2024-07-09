// This test is just like exportEqualsProperty, but with `export default`.

// @Filename: declarations.d.ts
declare namespace foo.bar {
    export type X = number;
    export const X: number;
}

declare module "foobar" {
    export default foo.bar;
}

declare module "foobarx" {
    export default foo.bar.X;
}

// @Filename: a.ts
namespace A {
    export class B { constructor(b: number) {} }
    export namespace B { export const b: number = 0; }
}
export default A.B;

// @Filename: b.ts
export default "foo".length;

// @Filename: index.ts
/// <reference path="declarations.d.ts" />
import fooBar from "foobar";
import X = fooBar.X;
import X2 from "foobarx";
const x: X = X;
const x2: X2 = X2;

import B from "./a";
const b: B = new B(B.b);

import fooLength from "./b";
fooLength + 1;
