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
    if (mod != null) for (var k in mod) b(k);
    result["default"] = mod;
    return result;
    function b(p) {
        if (Object.hasOwnProperty.call(mod, p))
            Object.create
                ? Object.defineProperty(result, p, {
                    enumerable: true,
                    get: function () {
                        return mod[p];
                    }
                })
                : (result[p] = mod[p]);
    }
};
exports.__esModule = true;
var mod = __importStar(require("./mod"));
mod.a;
mod.b;
