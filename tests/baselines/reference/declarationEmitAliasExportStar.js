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
Object.defineProperty(exports, "__esModule", { value: true });
//// [things.js]
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
__exportStar(require("./thingB"), exports);
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing2 = void 0;
var thing2 = function (param) { return null; };
exports.thing2 = thing2;


//// [thingB.d.ts]
export interface ThingB {
}
//// [things.d.ts]
export * from "./thingB";
//// [index.d.ts]
import * as things from "./things";
export declare const thing2: (param: things.ThingB) => any;
