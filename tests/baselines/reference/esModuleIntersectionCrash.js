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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var mod = __importStar(require("./mod"));
mod.a;
mod.b;
