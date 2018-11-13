//// [tests/cases/compiler/declarationEmitAliasExportStar.ts] ////

//// [thingB.ts]
export interface ThingB { }
//// [things.ts]
export * from "./thingB";
//// [index.ts]
import * as things from "./things";
export const thing2 = (param: things.ThingB) => null;


//// [thingB.js]
"use strict";
exports.__esModule = true;
//// [things.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.thing2 = function (param) { return null; };


//// [thingB.d.ts]
export interface ThingB {
}
//// [things.d.ts]
export * from "./thingB";
//// [index.d.ts]
import * as things from "./things";
export declare const thing2: (param: things.ThingB) => any;
