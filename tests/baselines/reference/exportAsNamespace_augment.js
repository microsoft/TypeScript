//// [tests/cases/compiler/exportAsNamespace_augment.ts] ////

//// [a.d.ts]
export as namespace a;
export const x = 0;
export const conflict = 0;

//// [b.ts]
import * as a2 from "./a";

declare global {
    namespace a {
        export const y = 0;
        export const conflict = 0;
    }
}

declare module "./a" {
    export const z = 0;
    export const conflict = 0;
}

a.x + a.y + a.z + a.conflict;
a2.x + a2.y + a2.z + a2.conflict;


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a2 = require("./a");
a.x + a.y + a.z + a.conflict;
a2.x + a2.y + a2.z + a2.conflict;
