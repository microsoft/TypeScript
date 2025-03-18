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
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f(i) {
    i.x;
}
