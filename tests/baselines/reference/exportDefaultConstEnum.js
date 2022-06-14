//// [tests/cases/compiler/exportDefaultConstEnum.ts] ////

//// [a.ts]
export default const enum A {
    A,
    B
}

//// [b.ts]
import A from "./a"

A.A;
A.B;


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
0 /* A.A */;
1 /* A.B */;
