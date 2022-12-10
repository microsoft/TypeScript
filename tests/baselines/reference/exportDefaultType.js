//// [tests/cases/compiler/exportDefaultType.ts] ////

//// [a.ts]
export default type A = number;

//// [b.ts]
import A from "./a"
let a: A;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a;
