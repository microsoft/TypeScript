//// [tests/cases/compiler/esModuleIntersectionCrash.ts] ////

//// [mod.d.ts]
export = modObj;
declare const modObj: modObj.A & modObj.B;
declare namespace modObj {
    interface A { (): void; a: string; }
    interface B { (x: string): void; b: string; }
}
//// [idx.ts]
import * as mod from "./mod";
mod.a;
mod.b;

//// [idx.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var mod = __importStar(require("./mod"));
mod.a;
mod.b;
