//// [tests/cases/compiler/exportStarSkipsNamedDefaultExport.ts] ////

//// [a.ts]
interface I {}
export default I;
export interface J {}

//// [b.ts]
export {};
declare module './a' {
    export default interface I { x: number; }
}

//// [c.ts]
export * from "./a";

//// [d.ts]
import { I, J } from "./c";
export const i: I = { x: 0 };
export const j: J = {};


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./a"), exports);
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.j = exports.i = void 0;
exports.i = { x: 0 };
exports.j = {};


//// [a.d.ts]
interface I {
}
export default I;
export interface J {
}
//// [b.d.ts]
export {};
declare module './a' {
    export default interface I {
        x: number;
    }
}
//// [c.d.ts]
export * from "./a";
//// [d.d.ts]
import { I, J } from "./c";
export declare const i: I;
export declare const j: J;
