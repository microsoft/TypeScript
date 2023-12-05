//// [tests/cases/compiler/globalFunctionAugmentationOverload.ts] ////

//// [mod.d.ts]
declare function expect(spy: Function): void;
declare module "mod" {
    class mod {}
    export = mod;
}
//// [mine.ts]
import "mod";

declare global {
    function expect(element: string): void;
}

//// [mine.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mod");
