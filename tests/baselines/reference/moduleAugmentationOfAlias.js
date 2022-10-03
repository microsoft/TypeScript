//// [tests/cases/compiler/moduleAugmentationOfAlias.ts] ////

//// [a.ts]
interface I {}
export default I;

//// [b.ts]
export {};
declare module './a' {
    export default interface I { x: number; }
}

//// [c.ts]
import I from "./a";
function f(i: I) {
    i.x;
}


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
//// [c.js]
"use strict";
exports.__esModule = true;
function f(i) {
    i.x;
}
