//// [tests/cases/compiler/declarationEmitAliasExportStar.ts] ////

//// [thingA.ts]
export interface ThingA { }
//// [thingB.ts]
export interface ThingB { }
//// [things.ts]
export { ThingA } from "./thingA";
export * from "./thingB";
//// [index.ts]
import * as things from "./things";
export const thing1 = (param: things.ThingA) => null;
export const thing2 = (param: things.ThingB) => null;


//// [thingA.js]
"use strict";
exports.__esModule = true;
//// [thingB.js]
"use strict";
exports.__esModule = true;
//// [things.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.thing1 = function (param) { return null; };
exports.thing2 = function (param) { return null; };


//// [thingA.d.ts]
export interface ThingA {
}
//// [thingB.d.ts]
export interface ThingB {
}
//// [things.d.ts]
export { ThingA } from "./thingA";
export * from "./thingB";
//// [index.d.ts]
import * as things from "./things";
export declare const thing1: (param: things.ThingA) => any;
export declare const thing2: (param: things.ThingB) => any;
