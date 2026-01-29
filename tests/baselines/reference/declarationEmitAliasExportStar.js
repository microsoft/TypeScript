//// [tests/cases/compiler/declarationEmitAliasExportStar.ts] ////

//// [thingB.ts]
export interface ThingB { }
//// [things.ts]
export * from "./thingB";
//// [index.ts]
import * as things from "./things";
export const thing2 = (param: things.ThingB) => null;


//// [thingB.js]
export {};
//// [things.js]
export * from "./thingB";
//// [index.js]
export const thing2 = (param) => null;


//// [thingB.d.ts]
export interface ThingB {
}
//// [things.d.ts]
export * from "./thingB";
//// [index.d.ts]
import * as things from "./things";
export declare const thing2: (param: things.ThingB) => any;
