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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = A.B;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "foo".length;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foobar_1 = require("foobar");
const foobarx_1 = require("foobarx");
const x = X;
const x2 = foobarx_1.default;
const a_1 = require("./a");
const b = new a_1.default(a_1.default.b);
const b_1 = require("./b");
b_1.default + 1;
