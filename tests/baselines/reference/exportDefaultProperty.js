//// [tests/cases/compiler/exportDefaultProperty.ts] ////

//// [declarations.d.ts]
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

//// [a.ts]
namespace A {
    export class B { constructor(b: number) {} }
    export namespace B { export const b: number = 0; }
}
export default A.B;

//// [b.ts]
export default "foo".length;

//// [index.ts]
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


//// [a.js]
var A;
(function (A) {
    class B {
        constructor(b) { }
    }
    A.B = B;
    (function (B) {
        B.b = 0;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
export default A.B;
//// [b.js]
export default "foo".length;
//// [index.js]
/// <reference path="declarations.d.ts" />
import fooBar from "foobar";
var X = fooBar.X;
import X2 from "foobarx";
const x = X;
const x2 = X2;
import B from "./a";
const b = new B(B.b);
import fooLength from "./b";
fooLength + 1;
