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
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
0 /* A.A */;
1 /* A.B */;
